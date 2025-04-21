/* eslint-disable @typescript-eslint/no-namespace */
import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import * as express from 'express';
import * as cors from 'cors';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './bootstrap.server';
import { environment } from '@portafolio/shared-data';

// Extiende la interfaz ProcessEnv para incluir VERCEL
const isVercel = process.env['VERCEL'] === '1';
const port = process.env['PORT'] || 4000;

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/apps/feportafolio/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');


  console.log('Server Environment:', {
    apiUrl: environment.apiUrl,
    production: environment.production,
    vercel: isVercel
  });

  server.use(cors());

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Configuración para Vercel
  server.enable('trust proxy'); // Para manejar correctamente los headers en Vercel

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
      fallthrough: false
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: 'SERVER_ENVIRONMENT', useValue: environment }
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  server.get('/api/ping', (req, res) => {
    res.send('pong desde SSR!');
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Solo ejecuta el servidor directamente si no estamos en Vercel
if (!isVercel) {
  run();
}

export default bootstrap;
