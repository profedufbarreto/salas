import { VALIDATION } from './constants'

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validateTitle = (title) => {
  return (
    title &&
    title.trim().length >= VALIDATION.MIN_TITLE_LENGTH &&
    title.trim().length <= VALIDATION.MAX_TITLE_LENGTH
  )
}

export const validateDescription = (description) => {
  return (
    description &&
    description.trim().length >= VALIDATION.MIN_DESCRIPTION_LENGTH &&
    description.trim().length <= VALIDATION.MAX_DESCRIPTION_LENGTH
  )
}

export const validateDuration = (duration) => {
  const numDuration = Number(duration)
  return (
    !isNaN(numDuration) &&
    numDuration >= VALIDATION.MIN_DURATION &&
    numDuration <= VALIDATION.MAX_DURATION
  )
}

export const validateImageUrl = (url) => {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateContentForm = (formData) => {
  const errors = {}

  if (!validateTitle(formData.title)) {
    errors.title = `Title must be between ${VALIDATION.MIN_TITLE_LENGTH} and ${VALIDATION.MAX_TITLE_LENGTH} characters`
  }

  if (!validateDescription(formData.description)) {
    errors.description = `Description must be between ${VALIDATION.MIN_DESCRIPTION_LENGTH} and ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`
  }

  if (!validateDuration(formData.duration)) {
    errors.duration = `Duration must be between ${VALIDATION.MIN_DURATION} and ${VALIDATION.MAX_DURATION} seconds`
  }

  if (formData.imageUrl && !validateImageUrl(formData.imageUrl)) {
    errors.imageUrl = 'Invalid image URL'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}