import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'sidenavmenu',
  exposes: {
    //'./Routes': 'apps/sidenavmenu/src/app/remote-entry/entry.component.ts',
    './MenuComponent': 'apps/sidenavmenu/src/app/components/menu.component.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
