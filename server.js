import jsonServer from 'json-server';
import fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req, res) => {
  if (!fs.existsSync('db.json')) {
    res.status(500).json({ error: 'db.json not found' });
    return;
  }
  server(req, res);
};