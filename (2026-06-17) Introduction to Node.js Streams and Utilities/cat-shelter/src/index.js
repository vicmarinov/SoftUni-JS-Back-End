import http from 'http';
import { serve } from './serve-file.js';

const SERVER_PORT = 5500;

const server = http.createServer(async (req, res) => {
    if (req.method !== 'GET') return;

    if (req.url.startsWith('/styles/')) {
        await serve.stylesheet(res, req.url);
        res.end();
        return;
    }

    await serve.page(res, req.url);
    res.end();
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});