const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Gunakan Ejs
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// Built-in Middleware
app.use(express.static('public'));

// Aplication level Middleware
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Taufik',
      email: 'taufik@gmail.com',
    },
    {
      nama: 'Irvan',
      email: 'Irvan@gmail.com',
    },
    {
      nama: 'naufal',
      email: 'naufal@gmail.com',
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Halaman Home',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
