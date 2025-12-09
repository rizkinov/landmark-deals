'use client'

import { useState, useEffect } from 'react'
import { getAdminUsers, createAdminUser, deactivateAdminUser, resetAdminPassword, getAdminRole, logAdminAction } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import * as CBRE from '../cbre'
import { PlusIcon, PersonIcon } from '@radix-ui/react-icons'
import type { AdminUser } from '../../lib/auth'

export function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [userRole, setUserRole] = useState<string>('none')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
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
      const result = await createAdminUser(newAdminEmail, newAdminRole, newAdminPassword)
      await logAdminAction('create_admin', newAdminEmail, { role: newAdminRole })
      
      setNewAdminEmail('')
      setNewAdminPassword('')
      setNewAdminRole('admin')
      setShowAddForm(false)
      await loadData()
      
      // Show detailed success message
      alert(`✅ Admin invitation created successfully!
      
📧 Email: ${newAdminEmail}
🔑 Password: ${newAdminPassword}
👤 Role: ${newAdminRole}

📋 Next steps:
1. Send these credentials to the new admin
2. They should go to the admin login page
3. Sign up with these exact credentials
4. Their admin account will be automatically activated

⚠️ Important: Save these credentials now - the password won't be shown again!`)
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
      await logAdminAction('deactivate_admin', email)
      await loadData()
      alert('Admin user deactivated successfully!')
    } catch (error) {
      alert(`Failed to deactivate admin: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteInvitation = async (adminId: string, email: string) => {
    if (!confirm(`Are you sure you want to delete the invitation for ${email}?`)) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId)
        .is('auth_user_id', null) // Only delete if no auth user linked
      
      if (error) throw error
      
      await logAdminAction('delete_invitation', email)
      await loadData()
      alert('Admin invitation deleted successfully!')
    } catch (error) {
      alert(`Failed to delete invitation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleResetPassword = async (email: string) => {
    if (!confirm(`Send password reset email to ${email}?\n\nThey will receive an email with a link to set a new password.`)) return

    try {
      await resetAdminPassword(email)
      await logAdminAction('reset_password', email)
      alert(`✅ Password reset email sent!\n\n📧 An email has been sent to ${email} with instructions to reset their password.\n\n⏰ The reset link will expire in 24 hours.`)
    } catch (error) {
      alert(`Failed to send reset email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (userRole !== 'super_admin') {
    return (
      <div className="p-6">
        <CBRE.CBRECard className="p-6">
          <div className="text-center">
            <PersonIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Management</h3>
            <p className="text-gray-600 mb-4">
              Super admin access required to manage admin users.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md text-sm">
              Your current role: <strong>{userRole.replace('_', ' ')}</strong>
            </div>
          </div>
        </CBRE.CBRECard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        <CBRE.CBREButton 
          onClick={() => setShowAddForm(true)}
          className="gap-2"
          disabled={adding}
        >
          <PlusIcon className="w-4 h-4" />
          Add Admin
        </CBRE.CBREButton>
      </div>

      {/* Add Admin Form */}
      {showAddForm && (
        <CBRE.CBRECard className="p-6">
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Admin</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                  placeholder="admin@cbre.com"
                  required
                  disabled={adding}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  disabled={adding}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'super_admin')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003F2D] focus:border-transparent"
                  disabled={adding}
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm">
              <p><strong>How it works:</strong></p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>An admin invitation will be created with the email and role</li>
                <li>Send the new admin their email and password</li>
                <li>They sign up at the admin login page with these credentials</li>
                <li>Their account will be automatically activated when they sign up</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <CBRE.CBREButton type="submit" disabled={adding}>
                {adding ? 'Creating...' : 'Create Admin'}
              </CBRE.CBREButton>
              <CBRE.CBREButton 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false)
                  setNewAdminEmail('')
                  setNewAdminPassword('')
                  setNewAdminRole('admin')
                }}
                disabled={adding}
              >
                Cancel
              </CBRE.CBREButton>
            </div>
          </form>
        </CBRE.CBRECard>
      )}

      {/* Admin Users Table */}
      <CBRE.CBRECard>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Admin Users</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mr-2">Active</span>
            User is logged in and active •
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 mx-2">Invitation Sent</span>
            Waiting for user to sign up •
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 ml-2">Inactive</span>
            User exists but deactivated
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{admin.email}</div>
                      <div className="text-sm text-gray-500">ID: {admin.id.slice(0, 8)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.role === 'super_admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : admin.auth_user_id 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {admin.is_active 
                        ? 'Active' 
                        : admin.auth_user_id 
                          ? 'Inactive'
                          : 'Invitation Sent'
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {admin.last_login 
                      ? new Date(admin.last_login).toLocaleString()
                      : 'Never'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {/* Reset Password - only for active users with auth_user_id */}
                      {admin.auth_user_id && admin.is_active && (
                        <CBRE.CBREButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleResetPassword(admin.email)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          Reset Password
                        </CBRE.CBREButton>
                      )}
                      {/* Deactivate - only for active non-super-admin users */}
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
                      {/* Delete Invitation - only for pending invitations */}
                      {!admin.auth_user_id && (
                        <CBRE.CBREButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteInvitation(admin.id, admin.email)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Delete Invitation
                        </CBRE.CBREButton>
                      )}
                      {/* Show protected label for super_admin with no other actions */}
                      {admin.role === 'super_admin' && !admin.auth_user_id && (
                        <span className="text-xs text-gray-500">Protected</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {admins.length === 0 && (
            <div className="text-center py-8">
              <PersonIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No admin users found</p>
            </div>
          )}
        </div>
      </CBRE.CBRECard>
    </div>
  )
} 