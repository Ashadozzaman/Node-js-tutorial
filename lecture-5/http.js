const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    } else if (req.url === '/about') {
        res.write('About Page');
        res.end();
    } else {
        res.write('Not Found');
        res.end();
    }
});

server.listen(3000);

console.log('Server running on port 3000');
