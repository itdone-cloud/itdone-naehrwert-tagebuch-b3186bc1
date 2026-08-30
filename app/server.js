const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = path.join(__dirname, 'public');

// Never let an unexpected error crash the whole process — a single bad
// request must not take the site offline for every other visitor.
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err && err.stack || err);
});
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection:', err && err.stack || err);
});

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';

    let filePath = path.join(ROOT, reqPath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      try {
        if (err) {
          // SPA-style fallback only for extension-less routes
          if (!path.extname(reqPath)) {
            fs.readFile(path.join(ROOT, 'index.html'), (err2, data2) => {
              try {
                if (err2) {
                  res.writeHead(404);
                  res.end('Not found');
                } else {
                  res.writeHead(200, { 'Content-Type': TYPES['.html'] });
                  res.end(data2);
                }
              } catch (e3) {
                console.error('response error:', e3);
              }
            });
          } else {
            res.writeHead(404);
            res.end('Not found');
          }
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      } catch (e2) {
        console.error('response error:', e2);
        try { res.writeHead(500); res.end('Internal error'); } catch (e4) {}
      }
    });
  } catch (e) {
    console.error('request handling error:', e);
    try { res.writeHead(500); res.end('Internal error'); } catch (e5) {}
  }
});

// Keep-alive tuned so the platform's proxy never sees a connection close
// mid-response during a rollout.
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(PORT, '0.0.0.0', () => {
  console.log('listening on ' + PORT);
});
