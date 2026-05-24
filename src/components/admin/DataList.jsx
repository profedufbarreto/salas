import { useEffect, useState } from 'react'
import { useData } from '../../hooks/useData'
import { deleteContent } from '../../services/dataService'
import LoadingSpinner from '../common/LoadingSpinner'
import DataForm from './DataForm'

const DataList = ({ refreshTrigger }) => {
  const { content, isLoading, error } = useData()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    // refresh trigger
  }, [refreshTrigger])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) {
      return
    }

    try {
      setIsDeleting(id)
      setDeleteError(null)
      await deleteContent(id)
    } catch (error) {
      setDeleteError(error.message)
    } finally {
      setIsDeleting(null)
    }
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
        Error loading content: {error}
      </div>
    )
  }

  if (selectedItem) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedItem(null)}
          className="btn-secondary"
        >
          ← Back
        </button>
        <DataForm 
          initialData={selectedItem}
          onSuccess={() => setSelectedItem(null)}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Contents ({content.length})
        </h2>
      </div>

      {deleteError && (
        <div className="mb-4 bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
          {deleteError}
        </div>
      )}

      {isLoading && <LoadingSpinner message="Loading contents..." />}

      {!isLoading && content.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-400 text-lg">No content available</p>
          <p className="text-gray-500 mt-2">Create new content to start</p>
        </div>
      )}

      {!isLoading && content.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map(item => (
            <div key={item.id} className="card hover:border-blue-500 transition-colors">
              {item.imageUrl && (
                <div className="mb-4 h-40 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.isActive 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-900/30 text-blue-400">
                  {item.category}
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-purple-900/30 text-purple-400">
                  {item.duration}s
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="flex-1 btn-primary text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting === item.id}
                  className="flex-1 btn-danger text-sm"
                >
                  {isDeleting === item.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DataList