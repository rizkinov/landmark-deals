import { supabase } from './supabase'
import { getCurrentAdmin } from './auth'

export interface SiteAccessToken {
  verified: boolean
  expiresAt: number
}

const SITE_ACCESS_TOKEN_KEY = 'landmark_deals_site_access'
const TOKEN_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours

// Check if user has valid site access (either admin or valid token)
export async function checkSiteAccess(): Promise<boolean> {
  // First check if user is an authenticated admin
  const admin = await getCurrentAdmin()
  if (admin) {
    return true // Admins bypass site password
  }

  // Check for valid access token
  return checkSiteAccessToken()
}

// Verify password against database
export async function verifySitePassword(password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('verify_site_password', {
      input_password: password
    })

    if (error) {
      console.error('Error verifying site password:', error)
      return false
    }

    return data === true
  } catch (error) {
    console.error('Exception verifying site password:', error)
    return false
  }
}

// Set site access token with 24-hour expiration
export function setSiteAccessToken(): void {
  const token: SiteAccessToken = {
    verified: true,
    expiresAt: Date.now() + TOKEN_DURATION_MS
  }

  try {
    localStorage.setItem(SITE_ACCESS_TOKEN_KEY, JSON.stringify(token))
  } catch (error) {
    console.error('Error setting site access token:', error)
  }
}

// Check if site access token is valid
export function checkSiteAccessToken(): boolean {
  try {
    const tokenStr = localStorage.getItem(SITE_ACCESS_TOKEN_KEY)
    if (!tokenStr) {
      return false
    }

    const token: SiteAccessToken = JSON.parse(tokenStr)

    // Check if token is expired
    if (Date.now() > token.expiresAt) {
      clearSiteAccessToken()
      return false
    }

    return token.verified === true
  } catch (error) {
    console.error('Error checking site access token:', error)
    clearSiteAccessToken()
    return false
  }
}

// Clear site access token
export function clearSiteAccessToken(): void {
  try {
    localStorage.removeItem(SITE_ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error('Error clearing site access token:', error)
  }
}

// Get time remaining on token (in milliseconds)
export function getTokenTimeRemaining(): number | null {
  try {
    const tokenStr = localStorage.getItem(SITE_ACCESS_TOKEN_KEY)
    if (!tokenStr) {
      return null
    }

    const token: SiteAccessToken = JSON.parse(tokenStr)
    const remaining = token.expiresAt - Date.now()

    return remaining > 0 ? remaining : null
  } catch (error) {
    return null
  }
}

// Admin function: Update site access password
export async function updateSitePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current admin to log the change
    const admin = await getCurrentAdmin()
    if (!admin) {
      return { success: false, error: 'Admin authentication required' }
    }

    // Validate password
    if (!newPassword || newPassword.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long' }
    }

    // Update password using the database function
    const { data, error } = await supabase.rpc('update_site_password', {
      new_password: newPassword,
      admin_user_id: admin.id
    })

    if (error) {
      console.error('Error updating site password:', error)
      return { success: false, error: error.message }
    }

    if (!data) {
      return { success: false, error: 'Failed to update password' }
    }

    // Log the action (optional, for audit trail)
    await logSitePasswordChange(admin.email)

    return { success: true }
  } catch (error) {
    console.error('Exception updating site password:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Get site password metadata (not the actual password)
export async function getSitePasswordStatus(): Promise<{
  isSet: boolean
  lastUpdated?: string
  updatedBy?: string
}> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('updated_at, updated_by')
      .eq('setting_key', 'site_access_password')
      .single()

    if (error || !data) {
      return { isSet: false }
    }

    // Get admin info if available
    let updatedByEmail = 'System'
    if (data.updated_by) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('email')
        .eq('id', data.updated_by)
        .single()

      if (adminData) {
        updatedByEmail = adminData.email
      }
    }

    return {
      isSet: true,
      lastUpdated: data.updated_at,
      updatedBy: updatedByEmail
    }
  } catch (error) {
    console.error('Error getting site password status:', error)
    return { isSet: false }
  }
}

// Log password change to audit trail
async function logSitePasswordChange(adminEmail: string): Promise<void> {
  try {
    // You can expand this to use your existing audit logging system
    console.log(`Site access password changed by: ${adminEmail} at ${new Date().toISOString()}`)
  } catch (error) {
    console.error('Error logging password change:', error)
  }
}
