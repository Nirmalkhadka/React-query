
# Project Title

A brief description of what this project does and who it's for

Task Manager
Task Manager is a web application for managing tasks with pagination, built using React, Vite, and React Query. It features a simple JSON Server backend to handle task data and is deployed on Vercel for seamless hosting. This project demonstrates the use of React Query for efficient data fetching, caching, and mutations.
Features

Task Management: Create, read, update, and delete tasks.
Infinite Scroll Pagination: Load tasks in batches of 3 using React Query's useInfiniteQuery.
Optimistic Updates: Real-time UI updates for task creation, toggling, and deletion.
Responsive Design: Clean and user-friendly interface.
Backend: JSON Server serves task data from db.json.
Deployment: Hosted on Vercel for fast and reliable access.

Vercel link:https://react-query-klig8ljqh-nks-projects-c72e214e.vercel.app
## Tech Stack


Frontend: React, Vite, React Query, Axios

Backend: JSON Server

Deployment: Vercel

Styling: CSS (or specify your styling library, e.g., Tailwind CSS)

Others: Node.js, npm

Node.js (v20.x recommended)

npm (v10.x or higher)

Git

Vercel account (for deployment)

React Query for data fetching.


Vite for fast development.

JSON Server for mock backend.

Vercel for hosting.
## Screenshots

Below are screenshots of the Task Manager in action:

Homepage displaying tasks with pagination.

Adding a new task.

Toggling and deleting tasks.
![screenshots](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(10).png?raw=true)
![image alt](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(11).png?raw=true)
![image alt](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(12).png?raw=true)
![image alt](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(13).png?raw=true)
![image alt](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(8).png?raw=true)
![image alt](https://github.com/Nirmalkhadka/React-query/blob/main/public/Screenshot%20(9).png?raw=true)


## Installation

```
Clone the Repository:
git clone https://github.com/Nirmalkhadka/React-query.git

cd task-manager


Install Dependencies:
npm install
```
## Environment Variables



Set Up Environment Variables:

Create a .env file in the root directory:VITE_API_URL=http://localhost:5000/tasks




Run JSON Server:

Ensure db.json is in the root with sample data:{
  "tasks": [
    
    { "id": 1, "title": "Learn React Query", "completed": false },
    
    { "id": 2, "title": "Build Task Manager", "completed": true },
    
    { "id": 3, "title": "Add Pagination", "completed": false }
  ]
}

```
Start the server:node server.js


Access at http://localhost:5000/tasks.


Run the Frontend:
npm run dev


Open http://localhost:5173 in your browser.
```
Deployment on Vercel

Push to GitHub:

Ensure all files (except node_modules, dist, .env) are committed:git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
## Setup

Set Up Vercel:

Log in to Vercel (https://vercel.com).

Create a new project and import Nirmalkhadka/React-query.

Configure:

Framework Preset: Other

Build Command: npm run build

Output Directory: dist

Environment Variables:

Key: VITE_API_URL

Value: /tasks




Deploy the project.
## Project Structure

```
task-manager/
├── node_modules/          # Dependencies (ignored)
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, styles
│   ├── components/       # React components
│   ├── services/         # API services (e.g., taskService.js)
├── .env                  # Environment variables (ignored)
├── .gitignore            # Ignored files
├── db.json               # JSON Server data
├── index.html            # Vite entry point
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lockfile
├── server.js             # JSON Server backend
├── vercel.json           # Vercel configuration
├── vite.config.js        # Vite configuration
```

## Contributing

Contributions are always welcome!

