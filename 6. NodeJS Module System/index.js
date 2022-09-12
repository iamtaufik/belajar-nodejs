// const fs = require('fs'); // core module
// const cetakNama = require('./coba'); // local module
// const moment = require('moment'); // thrid party module /npm module/ node_modules

const coba = require('./coba');
// console.log(coba);
console.log(coba.cetakNama('Taufik'), coba.PI, coba.mahasiswa.cetakMhs(), new coba.Orang());
