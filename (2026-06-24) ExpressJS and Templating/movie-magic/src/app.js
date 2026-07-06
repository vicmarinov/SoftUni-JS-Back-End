import express from 'express';

const SERVER_PORT = 5500;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});