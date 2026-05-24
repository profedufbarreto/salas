import { useState, useEffect } from 'react'
import { useData } from '../../hooks/useData'
import DisplayLayout from '../layout/DisplayLayout'
import ContentCard from './ContentCard'
import LoadingSpinner from '../common/LoadingSpinner'

const DisplayScreen = () => {
  const { content, isLoading, error } = useData()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)

  useEffect(() => {
    if (content.length === 0) return

    const currentItem = content[currentIndex]
    const duration = (currentItem?.duration || 10) * 1000

    const timer = setTimeout(() => {
      const next = (currentIndex + 1) % content.length
      setCurrentIndex(next)
      setNextIndex((next + 1) % content.length)
    }, duration)

    return () => clearTimeout(timer)
  }, [currentIndex, content])

  if (isLoading) {
    return (
      <DisplayLayout>
        <LoadingSpinner fullScreen message="Loading content..." />
      </DisplayLayout>
    )
  }

  if (error) {
    return (
      <DisplayLayout>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-2xl mb-4">Error loading content</p>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </DisplayLayout>
    )
  }

  if (content.length === 0) {
    return (
      <DisplayLayout>
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-3xl">No content available</p>
          </div>
        </div>
      </DisplayLayout>
    )
  }

  const currentContent = content[currentIndex]

  return (
    <DisplayLayout>
      <div className="w-full h-full">
        <ContentCard content={currentContent} isActive={true} />
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {content.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </DisplayLayout>
  )
}

export default DisplayScreen