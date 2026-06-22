import http from 'http';
import fs from 'fs/promises';

const SERVER_PORT = 5500;

const server = http.createServer(async (req, res) => {
    if (req.url === '/styles/site.css' && req.method === 'GET') {
        const stylesheet = await fs.readFile('./styles/site.css');

        res.writeHead(200, { 'content-type': 'text/css' });
        res.write(stylesheet);
        res.end();
        return;
    }

    if (req.url === '/' && req.method === 'GET') {
        const page = await fs.readFile('./views/homepage.html');

        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(page);
        res.end();
    }
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});