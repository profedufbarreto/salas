import { useState, useEffect } from 'react'
import { getActiveContent, watchContent } from '../services/dataService'

export const useData = () => {
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let unsubscribe

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        unsubscribe = watchContent((documents) => {
          const activeContent = documents
            .filter(item => item.isActive)
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          
          setContent(activeContent)
        })
      } catch (err) {
        setError(err.message)
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return {
    content,
    isLoading,
    error,
    refetch: async () => {
      const data = await getActiveContent()
      setContent(data)
    }
  }
}

export const useContentItem = (initialItem = {}) => {
  const [item, setItem] = useState(initialItem)
  const [isModified, setIsModified] = useState(false)

  const updateField = (field, value) => {
    setItem(prev => ({
      ...prev,
      [field]: value
    }))
    setIsModified(true)
  }

  const resetItem = () => {
    setItem(initialItem)
    setIsModified(false)
  }

  return {
    item,
    setItem,
    updateField,
    resetItem,
    isModified
  }
}