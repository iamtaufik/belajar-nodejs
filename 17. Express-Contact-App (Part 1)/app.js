const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact } = require('./utils/contact');

const app = express();
const port = 3000;

// Gunakan Ejs
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);

// Built-in Middleware
app.use(express.static('public'));

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
  const contacts = loadContacts();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
  });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
