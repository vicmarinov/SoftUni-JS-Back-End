import dotenv from 'dotenv/config';
import express from 'express';
import { engine as handlebarsEngine } from 'express-handlebars';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/auth-middleware.js';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Initialize Express app
const app = express();

// Setup Handlebars
app.engine('hbs', handlebarsEngine({
    extname: 'hbs',
    helpers: {
        setTitle (title) {
            this.pageTitle = title
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static assets
app.use(express.static('./src/public'));

// Setup body parser
app.use(express.urlencoded({ extended: false }));

// Setup cookie parser
app.use(cookieParser());

// Setup authentication middleware
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});