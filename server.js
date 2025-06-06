import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router); // Serve db.json directly
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});