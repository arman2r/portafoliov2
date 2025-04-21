// shared-data/src/lib/environments/environment.server.ts
export const serverEnvironment = {
    production: process.env['NODE_ENV'] === 'production',
    apiUrl: process.env['NX_PUBLIC_API_URL'] || 'http://localhost:4200',
    remoteUrlMode: process.env['REMOTE_URL_MODE'] || 'development'
};