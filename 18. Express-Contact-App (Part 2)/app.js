const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact, addContact, checkDuplicate } = require('./utils/contact');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// Gunakan Ejs
app.set('view engine', 'ejs');

// Middleware
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash('msg'),
  });
});

// Halaman from tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
  });
});

// Proses Tambah data contact
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) throw new Error('Nama Contact sudah digunakan');
      return true;
    }),
    check('email', 'Email Tidak Valid.').isEmail(),
    check('nohp', 'No HP Tidak Valid.').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contact',
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // Kirimkan flash message
      req.flash('msg', 'Data Berhasil Ditambahkan!');
      res.redirect('/contact');
    }
  }
);

// halaman detail contact
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
