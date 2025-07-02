import { supabase } from './supabase'

export interface AdminUser {
  id: string
  auth_user_id: string
  email: string
  role: 'super_admin' | 'admin'
  created_at: string
  last_login: string | null
  is_active: boolean
}

// Sign in admin user
export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  
  // Check if user is admin using security definer function
  const { data: adminData, error: adminError } = await supabase
    .rpc('get_user_admin_info', { user_id: data.user.id })
  
  // The RPC returns an array, so get the first result
  const adminRecord = adminData && adminData.length > 0 ? adminData[0] : null
  
  if (adminError || !adminRecord) {
    await supabase.auth.signOut()
    throw new Error('Access denied. Admin privileges required.')
  }
  
  // Update last login
  await supabase.rpc('update_admin_last_login')
  
  return { user: data.user, admin: adminRecord }
}

// Sign out
export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get current admin user
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('auth_user_id', user.id)
    .eq('is_active', true)
    .single()
  
  return adminData || null
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin')
  return !error && data === true
}

// Get admin role
export async function getAdminRole(): Promise<string> {
  const { data, error } = await supabase.rpc('get_admin_role')
  return error ? 'none' : data
}

// Create new admin user (super admin only)
export async function createAdminUser(email: string, role: 'admin' | 'super_admin' = 'admin') {
  const { data, error } = await supabase.rpc('create_admin_user', {
    admin_email: email,
    admin_role: role
  })
  
  if (error) throw error
  return data
}

// Get all admin users
export async function getAdminUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

// Deactivate admin user
export async function deactivateAdminUser(adminId: string) {
  const { error } = await supabase
    .from('admin_users')
    .update({ is_active: false })
    .eq('id', adminId)
  
  if (error) throw error
}

// Log admin action for audit trail
export async function logAdminAction(action: string, targetEmail?: string, details?: any) {
  const { error } = await supabase.rpc('log_admin_action', {
    action_type: action,
    target_email: targetEmail,
    action_details: details
  })
  
  if (error) {
    console.error('Failed to log admin action:', error)
    // Don't throw error for logging failures
  }
} 