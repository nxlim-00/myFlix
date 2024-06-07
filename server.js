const url = require('url');
let http = require('http');
let fs = require('fs');

http
  .createServer(function (req, res) {
    //let q = url.parse(req.url, true);
    /* let q = new URL(req.url, 'http://' + request.headers.host);
    let filename = '.' + q.pathname;
    let filePath = ''; */

    let addr = req.url,
      q = new URL(addr, 'http://localhost:8080'),
      filePath = '';

    /* let addr = request.url,
      q = new URL(addr, 'http://' + request.headers.host),
      filePath = ''; */

    fs.appendFile(
      'log.txt',
      'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added to log.');
        }
      }
    );

    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = __dirname + '/index.html';
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end('404 Not Found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
console.log('My test server is running on Port 8080.');
