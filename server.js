import jsonServer from 'json-server';
import fs from 'fs';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

let db;
try {
  if (!fs.existsSync('db.json')) {
    throw new Error('db.json not found');
  }
  db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
} catch (error) {
  console.error('Error reading db.json:', error);
  throw error; // Fail fast
}

const router = jsonServer.router(db);
server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};