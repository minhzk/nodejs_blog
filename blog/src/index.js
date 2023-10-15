const express = require('express');
const {engine} = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());


// HTTP logger
// app.use(morgan('combined'));

// Template engine setup
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// console.log('PATH:', path.join(__dirname, 'resources/views'));


// Basic routing
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  console.log(req.query.q)
  res.render('news');
});

app.get('/search', (req, res) => {
  // console.log(req.query.q);
  res.render('search');
});

app.post('/search', (req, res) => {

  console.log(req.body)

  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
