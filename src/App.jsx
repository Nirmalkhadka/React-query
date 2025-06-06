import { useInfiniteQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { fetchTasks } from './services/taskService';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import TaskFilter from './components/TaskFilter';
import ErrorBoundary from './components/ErrorBoundary';
import { useState } from 'react';
import './index.css';

function App() {
  const [filter, setFilter] = useState('all');
  const { reset } = useQueryErrorResetBoundary();

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['tasks', filter],
    queryFn: fetchTasks,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 2,
  });

  // Deduplicate tasks by id
  const tasks = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.tasks) || []).map((task) => [task.id, task])
    ).values()
  );
  console.log('Tasks:', tasks);

  const filteredTasks = tasks.filter((task) => {
    if (!task) return false;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });
  console.log('Filtered Tasks:', filteredTasks);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container bg-white p-4 rounded shadow" style={{ maxWidth: '700px' }}>
        <h1 className="text-center mb-4">Task Manager</h1>
        <ErrorBoundary reset={reset}>
          <TaskForm />
          <TaskFilter onFilterChange={setFilter} />
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted small">
              {isFetching && !isLoading ? 'Background Updating...' : ''}
            </span>
          </div>
          {isLoading && <p className="text-center text-muted">Loading tasks...</p>}
          {error && <p className="text-center text-danger">Error: {error.message}</p>}
          {filteredTasks.length === 0 && (
            <p className="text-center text-muted">No tasks available.</p>
          )}
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {hasNextPage && (
            <div className="text-center mt-3">
              <button
                onClick={() => fetchNextPage()}
                className="btn btn-primary"
                disabled={isFetching}
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;