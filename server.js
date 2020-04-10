const path = require('path');
const http = require('http');
const handler = require('serve-handler');

const distDir = path.join(__dirname, 'dist');
const port = process.env.PORT || 3000;

const isSecure = (request) => request.headers['x-forwarded-proto'] === 'https';

const server = http.createServer((request, response) => {
  if (!isSecure(request)) {
    response.writeHead(302, {
      location: `https://${request.headers.host}${request.url}`,
    });

    response.end();

    return;
  }

  handler(request, response, {
    public: distDir,
    directoryListing: false,
    rewrites: [
      {
        source: '/*',
        destination: 'index.html',
      },
    ],
  });
});

server.listen(port, () => {
  process.stdout.write(`Running at port ${port}\n`);
});
