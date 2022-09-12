// console.log("Hello World")
function cetakNama(nama) {
  return `Hallo nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
  nama: 'Taufik',
  umur: 19,
  cetakMhs() {
    return `Hello, nama saya ${this.nama}, dan saya umur ${this.umur}`;
  },
};

class Orang {
  constructor() {
    console.log('Objek orang telah dibuat');
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };

module.exports = { cetakNama, PI, mahasiswa, Orang };
