import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AdminDashboard from '../components/admin/AdminDashboard'
import MainLayout from '../components/layout/MainLayout'

const AdminPage = () => {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true)
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLogoutLoading(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Welcome, <span className="font-semibold">{user?.displayName || user?.email}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className="btn-secondary"
        >
          {isLogoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      <AdminDashboard />
    </MainLayout>
  )
}

export default AdminPage