import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../services/taskService'

function TaskForm() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      setTitle('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      mutation.mutate({ title, completed: false })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-group mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="form-control"
      />
      <button
        type="submit"
        className="btn btn-success"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm