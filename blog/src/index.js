const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3008;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine setup
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('PATH:', path.join(__dirname, 'resources/views'));

// Home, search, contact

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

