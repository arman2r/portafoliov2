import { ModuleFederationConfig } from '@nx/module-federation';

const isProd = process.env['NODE_ENV'] === 'production';

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
      ['admin', 'https://admin-your-vercel.vercel.app/remoteEntry.mjs'],
      ['sidenavmenu', 'https://sidenavmenu-your-vercel.vercel.app/remoteEntry.mjs'],
      ['about', 'about-portafolio.vercel.app/remoteEntry.mjs']
    ]
    : [
      ['admin', 'http://localhost:4201/remoteEntry.mjs'],
      ['sidenavmenu', 'http://localhost:4202/remoteEntry.mjs'],
      ['about', 'http://localhost:4203/remoteEntry.mjs']
    ]
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
