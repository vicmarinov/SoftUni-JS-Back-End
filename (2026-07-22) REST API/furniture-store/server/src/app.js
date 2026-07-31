import express from 'express';
import 'dotenv/config';

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on http://localhost:${SERVER_PORT}`);
});