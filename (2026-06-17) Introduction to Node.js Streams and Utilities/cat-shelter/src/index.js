import http from 'http';

const SERVER_PORT = 5500;

const server = http.createServer((req, res) => {
    res.end('Hello, World!');
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});