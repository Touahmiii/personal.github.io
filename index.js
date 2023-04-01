const express = require('express');
const http = require('http');
const https = require('https');
const url = require('url');

const app = express();

app.use('/', (req, res) => {
  const proxyUrl = url.parse('https://shell.cloud.google.com');
  const options = {
    hostname: proxyUrl.hostname,
    port: proxyUrl.port,
    path: req.url.replace('/', ''),
    method: req.method,
    headers: req.headers
  };
  
  const protocol = (proxyUrl.protocol === 'https:') ? https : http;
  const proxyReq = protocol.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  
  req.pipe(proxyReq, { end: true });
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Express server listening on port ${port}`);
});
