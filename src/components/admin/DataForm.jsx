import { useState } from 'react'
import { createContent, updateContent } from '../../services/dataService'
import { validateContentForm } from '../../utils/validators'
import { CONTENT_TYPES, CONTENT_CATEGORIES } from '../../utils/constants'

const DataForm = ({ initialData = null, onSuccess = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || CONTENT_TYPES.TEXT,
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || CONTENT_CATEGORIES.GENERAL,
    duration: initialData?.duration || 10,
    displayOrder: initialData?.displayOrder || 0,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')

    const validation = validateContentForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    try {
      setIsLoading(true)

      if (initialData?.id) {
        await updateContent(initialData.id, formData)
      } else {
        await createContent(formData)
      }

      setSuccessMessage(
        initialData?.id 
          ? 'Content updated successfully!'
          : 'Content created successfully!'
      )

      if (!initialData?.id) {
        setFormData({
          title: '',
          description: '',
          type: CONTENT_TYPES.TEXT,
          imageUrl: '',
          category: CONTENT_CATEGORIES.GENERAL,
          duration: 10,
          displayOrder: 0,
          isActive: true
        })
      }

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500)
      }
    } catch (error) {
      setErrors({
        submit: error.message || 'Error saving content'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="input-field"
            placeholder="Enter content title"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            className="input-field h-24 resize-none"
            placeholder="Enter content description"
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Type *
            </label>
            <select
              id="type"
              name="type"
              className="input-field"
              value={formData.type}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value={CONTENT_TYPES.TEXT}>Text</option>
              <option value={CONTENT_TYPES.IMAGE}>Image</option>
              <option value={CONTENT_TYPES.MIXED}>Mixed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              className="input-field"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value={CONTENT_CATEGORIES.GENERAL}>General</option>
              <option value={CONTENT_CATEGORIES.ANNOUNCEMENT}>Announcement</option>
              <option value={CONTENT_CATEGORIES.PROMOTION}>Promotion</option>
              <option value={CONTENT_CATEGORIES.SCHEDULE}>Schedule</option>
              <option value={CONTENT_CATEGORIES.ALERT}>Alert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              Duration (seconds) *
            </label>
            <input
              id="duration"
              name="duration"
              type="number"
              className="input-field"
              min="3"
              max="60"
              value={formData.duration}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.duration && <p className="form-error">{errors.duration}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="displayOrder" className="form-label">
              Display Order
            </label>
            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              className="input-field"
              min="0"
              value={formData.displayOrder}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className="input-field"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.imageUrl && <p className="form-error">{errors.imageUrl}</p>}
        </div>

        <div className="form-group">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4"
            />
            <span className="text-gray-300">Activate this content</span>
          </label>
        </div>

        {errors.submit && (
          <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/20 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData?.id ? 'Update' : 'Create Content'}
        </button>
      </form>
    </div>
  )
}

export default DataForm