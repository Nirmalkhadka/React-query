import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/tasks', router); // Mount JSON Server at /tasks
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});