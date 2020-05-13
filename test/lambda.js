const http = require('http');
var md5 = require('md5');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  let body = null;
  
  req.on('data', chunk => {
    body = chunk; // convert Buffer to string
  });
  req.on('end', () => {

    let obj_string = JSON.stringify(body);
    let obj_64 = Buffer.from(obj_string).toString("base64");
    let hash = md5(obj_64)

    console.log(hash)

    res.end('ok');
  });

});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});