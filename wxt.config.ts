import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  outDir: 'output',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    name: 'Feed Blocker',
    description: 'Hide feeds, Shorts and stories on social sites.',
    permissions: ['storage', 'activeTab'],
  },
});
