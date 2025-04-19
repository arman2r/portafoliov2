// api/ssr-handler.ts
import { createServer, proxy } from 'vercel-node-server';
import app from '../dist/apps/feportafolio/server/main';

export default createServer((req, res) => {
  app(req, res);
});