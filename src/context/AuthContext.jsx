import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export const useIsMobile = (breakpoint = 768) => {
  const { width } = useWindowSize()
  return width < breakpoint
}

export const useOrientation = () => {
  const { width, height } = useWindowSize()
  return {
    isPortrait: height > width,
    isLandscape: width > height,
    orientation: height > width ? 'portrait' : 'landscape'
  }
}