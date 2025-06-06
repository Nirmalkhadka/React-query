import jsonServer from 'json-server';
import fs from 'fs';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Load db.json into memory
let db = {};
try {
  db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
} catch (error) {
  console.error('Error reading db.json:', error);
}

const router = jsonServer.router(db);
server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};