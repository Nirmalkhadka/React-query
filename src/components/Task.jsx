import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, deleteTask } from '../services/taskService';

function Task({ task }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onMutate: async (updatedTask) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousPages = queryClient.getQueryData(['tasks']);

      // Optimistically update the cache
      queryClient.setQueryData(['tasks'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((t) =>
              t.id === updatedTask.id ? { ...t, completed: updatedTask.completed } : t
            ),
          })),
        };
      });

      return { previousPages };
    },
    onError: (err, updatedTask, context) => {
      // Revert to previous state on error
      queryClient.setQueryData(['tasks'], context.previousPages);
    },
    onSuccess: (data) => {
      // Update cache with server response
      queryClient.setQueryData(['tasks'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((t) => (t.id === data.id ? data : t)),
          })),
        };
      });
    },
    onSettled: () => {
      // Invalidate to refetch and ensure consistency
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleToggle = () => {
    updateMutation.mutate({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate(task.id);
  };

  return (
    <div className="d-flex align-items-center p-3 bg-light border rounded mb-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="form-check-input me-3"
      />
      <span className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
        {task.title}
      </span>
      <button
        onClick={handleDelete}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default Task;