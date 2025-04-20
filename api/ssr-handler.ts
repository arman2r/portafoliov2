import { IncomingMessage, ServerResponse } from 'http';

// Importa la app compilada desde Angular Universal
const app = require('../dist/apps/feportafolio/server/main').app;

export default function handler(req: IncomingMessage, res: ServerResponse) {
  app(req, res);
}