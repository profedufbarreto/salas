const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50'
    : 'flex items-center justify-center py-8'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-300 text-center">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner