const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/latihanMongo');

// // Menambah 1 data
// const contact1 = new Contact({
//   nama: 'Irvan',
//   nohp: '081212723333',
//   email: 'irvan@gmail.com',
// });

// // simpan ke collection
// contact1.save().then((result) => console.log(result));
