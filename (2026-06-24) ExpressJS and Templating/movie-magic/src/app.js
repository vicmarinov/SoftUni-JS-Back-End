import express from 'express';
import { engine as handlebarsEngine } from 'express-handlebars';

const SERVER_PORT = 5500;

const app = express();

// Setup Handlebars
app.engine('hbs', handlebarsEngine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Setup static assets
app.use(express.static('./src/public'));

// Setup routes
app.get('/', (req, res) => {
    res.render('homepage', { layout: false });
});

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on http://localhost:${SERVER_PORT}`);
});