import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Copy db.json to /tmp if it doesn't exist
const tmpDbPath = '/tmp/db.json';
if (!fs.existsSync(tmpDbPath)) {
  try {
    fs.copyFileSync('db.json', tmpDbPath);
  } catch (error) {
    console.error('Error copying db.json to /tmp:', error);
  }
}

const router = jsonServer.router(tmpDbPath);
server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};