Task Manager
A simple Task Manager application built to learn and demonstrate the usage of React Query (Tanstack Query) for efficient data fetching, caching, and state management. The app allows users to create, update, delete, and filter tasks with infinite scrolling pagination, powered by a JSON Server backend. The UI is styled using Bootstrap for a responsive and clean design.
Table of Contents

Features
Technologies
Setup
Running the Application
Deployment
Project Structure
Learning Objectives
Troubleshooting
Future Improvements

Features

Task Management:
Add new tasks.
Toggle task completion status.
Delete tasks.
Filter tasks by "All," "Completed," or "Incomplete."


Infinite Scrolling Pagination:
Loads tasks in batches of 3 using React Query's useInfiniteQuery.


Optimistic Updates:
Updates the UI instantly for task completion and deletion, with rollback on error.


Error Handling:
Displays errors with a retry option using an ErrorBoundary component.


Responsive Design:
Styled with Bootstrap for a clean and mobile-friendly interface.



Technologies

Frontend:
React 18
React Query (Tanstack Query) for data fetching and state management
Bootstrap 5 for styling
Axios for HTTP requests


Backend:
JSON Server for a mock REST API


Build Tools:
Vite or Create React App (depending on your setup)
npm for package management



Setup
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)
Git

Installation

Clone the repository:
git clone <repository-url>
cd task-manager


Install frontend dependencies:
npm install


Install JSON Server globally (for development):
npm install -g json-server


Create a db.json file in the project root with the following content:
{
  "tasks": [
    { "id": 1, "title": "Learn React Query", "completed": false },
    { "id": 2, "title": "Build Task Manager", "completed": true },
    { "id": 3, "title": "Add Pagination", "completed": false },
    { "id": 4, "title": "Implement Filtering", "completed": false },
    { "id": 5, "title": "Test Error Handling", "completed": true },
    { "id": 6, "title": "Deploy App", "completed": false },
    { "id": 7, "title": "Write README", "completed": false },
    { "id": 8, "title": "Add Tests", "completed": false }
  ]
}



Running the Application

Start the JSON Server:Run the JSON Server to serve the mock API on http://localhost:5000:
json-server --watch db.json --port 5000


Start the React application:In a separate terminal, run the development server:
npm start

The app will be available at http://localhost:3000 (or another port if specified).

Interact with the app:

Add tasks via the input form.
Toggle task completion with the checkbox.
Delete tasks using the "Delete" button.
Filter tasks using the "All," "Completed," or "Incomplete" buttons.
Click "Load More" to fetch additional tasks.



Deployment
Deploying this application requires both the frontend (React app) and the backend (JSON Server or equivalent API). The error you encountered on Netlify ("Error: Failed to fetch tasks") indicates that the frontend was deployed, but the backend API (http://localhost:5000/tasks) is not available in the production environment. Netlify only deploys static assets and does not run Node.js servers like JSON Server.
Steps to Deploy
Option 1: Deploy Frontend on Netlify with a Separate Backend

Host the Backend:

Deploy the JSON Server or a similar backend to a platform that supports Node.js, such as:
Heroku:
Create a server.js file to run JSON Server:const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});


Install dependencies:npm install json-server


Deploy to Heroku:heroku create
git add .
git commit -m "Add JSON Server for deployment"
git push heroku main


Note the Heroku app URL (e.g., https://your-app.herokuapp.com).


Render or Vercel (with Node.js support) are other options.


Update src/services/taskService.js to use the deployed backend URL:const API_URL = 'https://your-app.herokuapp.com/tasks'; // Replace with your backend URL




Build the Frontend:
npm run build


Deploy to Netlify:

Drag and drop the build folder to Netlify’s dashboard, or use the Netlify CLI:netlify deploy --prod


Set the environment variable in Netlify (optional, if hardcoded in taskService.js):
Go to Netlify Dashboard > Site Settings > Environment Variables.
Add REACT_APP_API_URL=https://your-app.herokuapp.com/tasks.




Test the Deployed App:

Ensure the frontend makes requests to the deployed backend URL.
Verify tasks load, and add/update/delete operations work.



Option 2: Mock API with Static JSON
If you don’t need a dynamic backend, host db.json as a static file and use it directly:

Upload db.json to a public location (e.g., a GitHub repository or Netlify’s public folder).
Update taskService.js to fetch the static JSON:import axios from 'axios';

const API_URL = 'https://your-static-host.com/db.json'; // Replace with your static JSON URL

export const fetchTasks = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(API_URL);
    const tasks = Array.isArray(response.data.tasks) ? response.data.tasks : [];
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

// Mock add, update, delete (these won't persist)
export const addTask = async (task) => ({ ...task, id: Date.now() });
export const updateTask = async (task) => task;
export const deleteTask = async (id) => id;


Deploy the frontend to Netlify as described above.
Limitation: Add, update, and delete operations won’t persist since the JSON is static.

Option 3: Use a Real Backend
For a production-ready solution, replace JSON Server with a backend like:

Firebase, Supabase, or MongoDB Atlas for a managed database.
Node.js/Express with a database, deployed to Heroku, Render, or Vercel.Update taskService.js to use the new backend’s API endpoints.

Fixing the Netlify Deployment Error
The "Error: Failed to fetch tasks" occurs because the frontend is trying to reach http://localhost:5000/tasks, which doesn’t exist in production. To fix:

Ensure the backend is deployed (Option 1) or use a static JSON file (Option 2).
Update the API_URL in taskService.js to point to the deployed backend or static JSON URL.
If using environment variables:
Create a .env file in the project root:REACT_APP_API_URL=https://your-app.herokuapp.com/tasks


Update taskService.js:const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/tasks';


Add the environment variable in Netlify as described above.


Rebuild and redeploy:npm run build
netlify deploy --prod



Project Structure
task-manager/
├── db.json                  # Mock backend data
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx # Error boundary for handling errors
│   │   ├── Task.jsx          # Task component for displaying and managing tasks
│   │   ├── TaskFilter.jsx    # Filter component for task filtering
│   │   ├── TaskForm.jsx      # Form for adding new tasks
│   ├── services/
│   │   ├── taskService.js    # API service for task operations
│   ├── App.jsx               # Main app component
│   ├── index.css             # Custom styles (minimal, as Bootstrap is used)
│   ├── main.jsx              # Entry point
├── package.json              # Project dependencies and scripts
├── README.md                 # This file

Learning Objectives
This project focuses on learning React Query by implementing:

Data Fetching: Using useInfiniteQuery for paginated task loading.
Mutations: Using useMutation for adding, updating, and deleting tasks.
Optimistic Updates: Updating the UI before server responses with rollback on errors.
Caching: Leveraging React Query’s cache to minimize unnecessary API calls.
Error Handling: Managing errors with ErrorBoundary and retry mechanisms.

Troubleshooting

"Error: Failed to fetch tasks":
Ensure the JSON Server is running locally (json-server --watch db.json --port 5000).
For deployment, verify the backend is deployed and API_URL is updated.


Duplicate Tasks:
Ensure App.jsx deduplicates tasks using a Map (as in the provided code).


Completed Status Not Updating:
Check that updateTask in taskService.js sends correct PUT requests.
Verify useMutation in Task.jsx handles server responses properly.


CORS Issues:
If deploying the backend separately, ensure CORS is enabled (JSON Server enables it by default).


Netlify Deployment:
Confirm environment variables are set in Netlify.
Verify the backend URL is accessible from the deployed frontend.



Future Improvements

Add TypeScript for type safety.
Implement unit tests with Jest and React Testing Library.
Replace JSON Server with a production-ready backend (e.g., Firebase, Supabase).
Add task editing functionality.
Enhance UI with additional Bootstrap components (e.g., modals for confirmation).
Implement search functionality for tasks.
Add loading spinners for mutations.

