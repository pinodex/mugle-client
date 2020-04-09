module.exports = {
  site: {
    title: 'Mugle',
    description: 'Mugle',
    url: process.env.WEB_URL,
  },

  api: {
    url: process.env.API_URL,
  },

  ws: {
    url: process.env.WS_URL,
  },

  peerjs: {
    host: process.env.PEERJS_HOST || null,
    port: process.env.PEERJS_PORT || null,
    path: process.env.PEERJS_PATH || null,
    secure: process.env.PEERJS_SECURE || false,
  },
};
