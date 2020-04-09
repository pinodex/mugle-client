const path = require('path');
const http = require('http');
const handler = require('serve-handler');

const distDir = path.join(__dirname, 'dist');
const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => handler(request, response, {
  public: distDir,
  directoryListing: false,
  rewrites: [
    {
      source: '/*',
      destination: 'index.html',
    },
  ],
}));

server.listen(port, () => {
  process.stdout.write(`Running at port ${port}\n`);
});
