import { useState } from 'react'
import DataForm from './DataForm'
import DataList from './DataList'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('list')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleContentCreated = () => {
    setRefreshTrigger(prev => prev + 1)
    setActiveTab('list')
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'list'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Content List
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'create'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          New Content
        </button>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'list' && <DataList refreshTrigger={refreshTrigger} />}
        {activeTab === 'create' && <DataForm onSuccess={handleContentCreated} />}
      </div>
    </div>
  )
}

export default AdminDashboard