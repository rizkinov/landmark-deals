# 🔐 Admin Authentication Implementation Guide

## 📋 Overview

This guide will help you implement a secure admin authentication system with:
- **Login modal** for admin access
- **Role-based permissions** (super_admin vs admin)
- **User management** (super admins can add/remove admins)
- **Audit logging** for security tracking
- **Route protection** for admin dashboard

---

## 🚀 Phase 1: Supabase Setup

### **Step 1: Enable Authentication**
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Settings**
3. Configure these settings:
   ```
   ✅ Enable Email provider
   ❌ Disable email confirmations (for admin convenience)
   ✅ Enable secure email change
   ✅ Enable secure password change
   ✅ Enable signup (temporarily, we'll disable after creating admin)
   ```

### **Step 2: Run Database Setup**
1. Open Supabase **SQL Editor**
2. Copy and paste the entire contents of `database/setup/admin-auth-setup.sql`
3. Click **"Run"**
4. Verify success by checking the verification queries at the bottom

### **Step 3: Create Super Admin Account**
1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Fill in:
   - **Email**: `rizki.novianto@cbre.com`
   - **Password**: `[PRIVATE - Contact admin for credentials]`
   - **Auto confirm user**: ✅
4. **Copy the User ID** from the users list

### **Step 4: Link Super Admin to Admin Table**
1. Open `database/setup/create-super-admin.sql`
2. Replace `YOUR_AUTH_USER_ID_HERE` with the copied User ID
3. Run the modified SQL in Supabase SQL Editor
4. Verify with the verification queries in that file

### **Step 5: Security Lockdown**
1. Go back to **Authentication** → **Settings**
2. **Disable signup** (❌ Enable signup) - prevents unauthorized registrations
3. Only super admins will be able to create new admin accounts through the app

---

## 💻 Phase 2: Frontend Implementation

### **Step 1: Update Supabase Client**

Create or update `src/lib/auth.ts`:

```typescript
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
  
  // Check if user is admin
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('auth_user_id', data.user.id)
    .eq('is_active', true)
    .single()
  
  if (adminError || !adminData) {
    await supabase.auth.signOut()
    throw new Error('Access denied. Admin privileges required.')
  }
  
  // Update last login
  await supabase.rpc('update_admin_last_login')
  
  return { user: data.user, admin: adminData }
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
```

### **Step 2: Create Admin Login Modal**

Create `src/components/admin/AdminLoginModal.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { signInAdmin } from '../../lib/auth'
import * as CBRE from '../cbre'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

interface AdminLoginModalProps {
  isOpen: boolean
  onSuccess: () => void
}

export function AdminLoginModal({ isOpen, onSuccess }: AdminLoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInAdmin(email, password)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Enter your admin credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D]"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                disabled={loading}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <CBRE.CBREButton 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </CBRE.CBREButton>
        </form>
      </div>
    </div>
  )
}
```

### **Step 3: Create Admin Route Guard**

Create `src/components/admin/AdminGuard.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentAdmin, signOutAdmin } from '../../lib/auth'
import { AdminLoginModal } from './AdminLoginModal'
import type { AdminUser } from '../../lib/auth'

interface AdminGuardProps {
  children: React.ReactNode
  requireSuperAdmin?: boolean
}

export function AdminGuard({ children, requireSuperAdmin = false }: AdminGuardProps) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentAdmin = await getCurrentAdmin()
      
      if (!currentAdmin) {
        setShowLoginModal(true)
        return
      }

      if (requireSuperAdmin && currentAdmin.role !== 'super_admin') {
        alert('Super admin access required')
        await signOutAdmin()
        router.push('/')
        return
      }

      setAdmin(currentAdmin)
      setShowLoginModal(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      setShowLoginModal(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = () => {
    checkAuth()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#003F2D]"></div>
      </div>
    )
  }

  if (!admin) {
    return (
      <AdminLoginModal 
        isOpen={showLoginModal}
        onSuccess={handleLoginSuccess}
      />
    )
  }

  return <>{children}</>
}
```

### **Step 4: Update Admin Layout**

Update `app/admin/layout.tsx`:

```typescript
import { AdminGuard } from '../../src/components/admin/AdminGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Your existing admin layout */}
        {children}
      </div>
    </AdminGuard>
  )
}
```

### **Step 5: Create Admin Management Interface**

Create `src/components/admin/AdminManagement.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { getAdminUsers, createAdminUser, deactivateAdminUser, getAdminRole } from '../../lib/auth'
import * as CBRE from '../cbre'
import type { AdminUser } from '../../lib/auth'

export function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [userRole, setUserRole] = useState<string>('none')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'super_admin'>('admin')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [adminsData, roleData] = await Promise.all([
        getAdminUsers(),
        getAdminRole()
      ])
      setAdmins(adminsData)
      setUserRole(roleData)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)

    try {
      await createAdminUser(newAdminEmail, newAdminRole)
      setNewAdminEmail('')
      setNewAdminRole('admin')
      setShowAddForm(false)
      await loadData()
      alert('Admin user created successfully!')
    } catch (error) {
      alert(`Failed to create admin: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setAdding(false)
    }
  }

  const handleDeactivate = async (adminId: string, email: string) => {
    if (!confirm(`Are you sure you want to deactivate ${email}?`)) return

    try {
      await deactivateAdminUser(adminId)
      await loadData()
      alert('Admin user deactivated successfully!')
    } catch (error) {
      alert(`Failed to deactivate admin: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (loading) {
    return <div className="p-6">Loading admin management...</div>
  }

  if (userRole !== 'super_admin') {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          Super admin access required to manage admin users.
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Management</h2>
        <CBRE.CBREButton onClick={() => setShowAddForm(true)}>
          Add Admin
        </CBRE.CBREButton>
      </div>

      {showAddForm && (
        <CBRE.CBRECard className="mb-6">
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Admin</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
                disabled={adding}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'super_admin')}
                className="w-full px-3 py-2 border rounded-md"
                disabled={adding}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div className="flex gap-2">
              <CBRE.CBREButton type="submit" disabled={adding}>
                {adding ? 'Creating...' : 'Create Admin'}
              </CBRE.CBREButton>
              <CBRE.CBREButton 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                disabled={adding}
              >
                Cancel
              </CBRE.CBREButton>
            </div>
          </form>
        </CBRE.CBRECard>
      )}

      <CBRE.CBRECard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Last Login</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b">
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      admin.role === 'super_admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      admin.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {admin.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3">
                    {admin.last_login 
                      ? new Date(admin.last_login).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="p-3">
                    {admin.is_active && admin.role !== 'super_admin' && (
                      <CBRE.CBREButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeactivate(admin.id, admin.email)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Deactivate
                      </CBRE.CBREButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CBRE.CBRECard>
    </div>
  )
}
```

---

## 🧪 Phase 3: Testing

### **Step 1: Test Authentication**
1. Start your development server: `npm run dev`
2. Navigate to `/admin`
3. Login modal should appear
4. Use credentials: `rizki.novianto@cbre.com` / `[PRIVATE - Contact admin for credentials]`
5. Should successfully access admin dashboard

### **Step 2: Test Admin Management**
1. Go to admin dashboard
2. Access the admin management interface
3. Try creating a new admin user
4. Test deactivating an admin user
5. Verify role-based access restrictions

### **Step 3: Test Security**
1. Try accessing `/admin` in incognito mode (should show login)
2. Try with wrong credentials (should show error)
3. Test session persistence (refresh page, should stay logged in)
4. Test logout functionality

---

## 🔒 Security Features

✅ **Secure Authentication**: Uses Supabase Auth with RLS policies
✅ **Role-Based Access**: Super admin vs regular admin permissions
✅ **Audit Logging**: All admin actions are logged
✅ **Route Protection**: Unauthorized access is blocked
✅ **Session Management**: Proper login/logout handling
✅ **Input Validation**: Email and role validation
✅ **CSRF Protection**: Built into Supabase Auth

---

## 📝 Next Steps

1. **Run the Supabase setup** (Steps 1-5 above)
2. **Implement the frontend components** (copy the code above)
3. **Test thoroughly** in development
4. **Deploy to staging** and test again
5. **Add to production** with proper monitoring

---

## 🆘 Troubleshooting

**Login fails with "Access denied"**:
- Check if admin_users record exists for the email
- Verify the auth_user_id matches in both tables

**"Function is_admin does not exist"**:
- Make sure you ran the admin-auth-setup.sql file completely

**Can't create new admin users**:
- Ensure you're logged in as super_admin
- Check Supabase logs for specific error messages

**Permission denied errors**:
- Verify RLS policies are set up correctly
- Check if user is properly authenticated

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify database setup with the verification queries
3. Test authentication in the Supabase dashboard
4. Review browser console for JavaScript errors 