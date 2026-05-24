const DisplayLayout = ({ children, showHeader = false }) => {
  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      {showHeader && (
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Information</h1>
        </header>
      )}
      
      <main className="w-full h-full">
        {children}
      </main>
    </div>
  )
}

export default DisplayLayout