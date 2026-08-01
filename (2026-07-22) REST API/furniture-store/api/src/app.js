import express from 'express';
import 'dotenv/config';
import routes from './routes.js';
import cors from 'cors';
import { authMiddleware, errorMiddleware } from './middlewares';

const SERVER_PORT = process.env.SERVER_PORT || 3030;

const app = express();

// Setup CORS
app.use(cors());

// Setup body parser
app.use(express.json());

// Setup authentication middleware
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Setup error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on http://localhost:${SERVER_PORT}`);
});