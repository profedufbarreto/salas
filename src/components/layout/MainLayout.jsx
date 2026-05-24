const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

export default MainLayout