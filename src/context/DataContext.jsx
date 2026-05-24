import { createContext, useState, useEffect } from 'react'
import { watchContent } from '../services/dataService'

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [contentList, setContentList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = watchContent((documents) => {
      try {
        const sortedContent = documents
          .filter(item => item.isActive)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        
        setContentList(sortedContent)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const getContentById = (id) => {
    return contentList.find(item => item.id === id)
  }

  const getContentByCategory = (category) => {
    return contentList.filter(item => item.category === category)
  }

  const value = {
    contentList,
    isLoading,
    error,
    getContentById,
    getContentByCategory
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}