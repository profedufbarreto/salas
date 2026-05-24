export const CONTENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  MIXED: 'mixed'
}

export const CONTENT_CATEGORIES = {
  GENERAL: 'general',
  ANNOUNCEMENT: 'announcement',
  PROMOTION: 'promotion',
  SCHEDULE: 'schedule',
  ALERT: 'alert'
}

export const DEFAULT_DURATIONS = {
  SHORT: 5,
  MEDIUM: 10,
  LONG: 20
}

export const MESSAGES = {
  SUCCESS_CREATE: 'Content created successfully!',
  SUCCESS_UPDATE: 'Content updated successfully!',
  SUCCESS_DELETE: 'Content deleted successfully!',
  ERROR_GENERIC: 'An error occurred. Try again.',
  ERROR_AUTH: 'Authentication error. Please login again.',
  LOADING: 'Loading...',
  NO_DATA: 'No content available'
}

export const DISPLAY_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#1F2937',
  SUCCESS: '#10B981',
  DANGER: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#0EA5E9',
  BACKGROUND: '#111827'
}

export const DISPLAY_FONT_SIZES = {
  EXTRA_LARGE: '4rem',
  LARGE: '3rem',
  MEDIUM: '2rem',
  SMALL: '1.5rem'
}

export const VALIDATION = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_DURATION: 3,
  MAX_DURATION: 60
}