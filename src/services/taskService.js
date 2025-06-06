import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = async ({ pageParam = 1 }) => {
  try {
    // Fetch all tasks (or use a larger limit if server supports it)
    const response = await axios.get(`${API_URL}?_page=${pageParam}&_limit=3`);
    console.log('API Response:', response.data);
    const tasks = Array.isArray(response.data) ? response.data : [];
    
    // Simulate offset-based pagination client-side
    const startIndex = (pageParam - 1) * 3;
    const paginatedTasks = tasks.slice(startIndex, startIndex + 3);

    return {
      tasks: paginatedTasks.filter((task) => task && task.id && typeof task.completed === 'boolean'),
      nextPage: paginatedTasks.length === 3 ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error('Fetch tasks error:', error.message);
    throw new Error('Failed to fetch tasks');
  }
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};