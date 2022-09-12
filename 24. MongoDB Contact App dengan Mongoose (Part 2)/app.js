const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./models/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Konfigurasi flash
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

// Halaman home
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

// Halamn About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

//Halaman Contact
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg'),
  });
});

// Halam form tambah dat contact
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
    body('nama').custom(async (value) => {
      const duplicate = await Contact.findOne({
        nama: value,
      });
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
      Contact.insertMany(req.body, (err, result) => {
        req.flash('msg', 'Data Berhasil Ditambahkan!');
        res.redirect('/contact');
      });
    }
  }
);

// Proses delete contac
app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'Data Berhasil Dihapus!');
    res.redirect('/contact');
  });
});

// Proses ubah data
app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({
        nama: value,
      });
      if (value !== req.body.oldNama && duplicate) throw new Error('Nama Contact sudah digunakan');
      return true;
    }),
    check('email', 'Email Tidak Valid.').isEmail(),
    check('nohp', 'No HP Tidak Valid.').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Ubah Data Contact',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        {
          _id: req.body._id,
        },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // Kirimkan flash message
        req.flash('msg', 'Data Berhasil Diubah!');
        res.redirect('/contact');
      });
    }
  }
);

// Form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({
    nama: req.params.nama,
  });
  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Ubah Data Contact',
    contact,
  });
});

// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({
    nama: req.params.nama,
  });
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
