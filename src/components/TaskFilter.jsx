import { useState } from 'react'

function TaskFilter({ onFilterChange }) {
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    onFilterChange(newFilter)
  }

  return (
    <div className="btn-group mb-3" role="group">
      <button
        onClick={() => handleFilterChange('all')}
        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange('completed')}
        className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        Completed
      </button>
      <button
        onClick={() => handleFilterChange('incomplete')}
        className={`btn ${filter === 'incomplete' ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        Incomplete
      </button>
    </div>
  )
}

export default TaskFilter