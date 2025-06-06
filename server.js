import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

let db;
try {
  const dbPath = path.resolve('db.json');
  if (!fs.existsSync(dbPath)) {
    throw new Error('db.json not found at ' + dbPath);
  }
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (error) {
  console.error('Error reading db.json:', error);
  throw error;
}

const router = jsonServer.router(db);
server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};