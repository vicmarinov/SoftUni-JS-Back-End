import express from 'express';
import { engine as handlebarsEngine } from 'express-handlebars';
import routes from './routes.js';

const SERVER_PORT = 5500;

const app = express();

// Setup Handlebars
app.engine('hbs', handlebarsEngine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static assets
app.use(express.static('./src/public'));

// Setup routes
app.use(routes);

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on http://localhost:${SERVER_PORT}`);
});