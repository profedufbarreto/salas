import { createContext, useState, useEffect } from 'react'
import { onAuthStateChange, loginUser, logoutUser, registerUser } from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const authUser = await loginUser(email, password)
      setUser(authUser)
      return authUser
    } catch (err) {
      const errorMessage = handleAuthError(err.code)
      setError(errorMessage)
      throw err
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await logoutUser()
      setUser(null)
    } catch (err) {
      const errorMessage = handleAuthError(err.code)
      setError(errorMessage)
      throw err
    }
  }

  const register = async (email, password, displayName) => {
    try {
      setError(null)
      const authUser = await registerUser(email, password, displayName)
      setUser(authUser)
      return authUser
    } catch (err) {
      const errorMessage = handleAuthError(err.code)
      setError(errorMessage)
      throw err
    }
  }

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const handleAuthError = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Weak password',
    'auth/invalid-email': 'Invalid email',
    'auth/operation-not-allowed': 'Operation not allowed',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your internet.'
  }

  return errorMessages[errorCode] || 'Authentication error. Try again.'
}