
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 1541, hash: 'cafc39c9f6527189a77ae148eb20382c860509c33d4ebc8e42a47bb5738e51aa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1481, hash: '7ab9b8efc1301446e5259de797ff12415295086017c16328b8ed9a2558a85595', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-A3ODYSXO.css': {size: 837, hash: 'J6Z06hrYqM4', text: () => import('./assets-chunks/styles-A3ODYSXO_css.mjs').then(m => m.default)}
  },
};
