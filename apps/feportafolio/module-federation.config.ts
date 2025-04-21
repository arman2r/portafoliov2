import { ModuleFederationConfig } from '@nx/module-federation';

const isProd = process.env['REMOTE_URL_MODE'] === 'production';

const config: ModuleFederationConfig = {
  name: 'feportafolio',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: isProd
    ? [
      ['admin', 'https://admin-portafolio.vercel.app/remoteEntry.mjs'],
      ['sidenavmenu', 'https://sidenavmenu-portafolio.vercel.app/remoteEntry.mjs'],
      ['about', 'https://about-portafolio.vercel.app/remoteEntry.mjs'],
    ]
    : [
      ['admin', 'http://localhost:4201/remoteEntry.mjs'],
      ['sidenavmenu', 'http://localhost:4202/remoteEntry.mjs'],
      ['about', 'http://localhost:4203/remoteEntry.mjs'],
    ]
};

console.log('API URL:', process.env.NX_PUBLIC_API_URL);
console.log('Remote Mode:', process.env.REMOTE_URL_MODE);

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
