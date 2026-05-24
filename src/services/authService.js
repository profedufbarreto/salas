import { auth } from '../config/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser
} from 'firebase/auth'

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      })
    }
    
    return userCredential.user
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => {
  return auth.currentUser
}

export const updateUserProfile = async (updates) => {
  try {
    const user = auth.currentUser
    if (user) {
      await updateProfile(user, updates)
      return user
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

export const deleteCurrentUser = async () => {
  try {
    const user = auth.currentUser
    if (user) {
      await deleteUser(user)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}