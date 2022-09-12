const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'latihanMongo';

const client = new MongoClient(uri);

client.connect((error, client) => {
  if (error) return console.log('Koneksi gagal');

  //   Pilih database
  const db = client.db(dbName);

  //   Menambahkan 1 data ke collection mahasiswa
  //   db.collection('mahasiswa').insertOne(
  //     {
  //       nama: 'Irvan',
  //       email: 'shandika@gmail.com',
  //     },
  //     (err, result) => {
  //       if (err) return console.log('Gagal menambahkan data');
  //       console.log(result);
  //     }
  //   );

  // Menabhakan lebih dari 1 data
  //   db.collection('mahasiswa').insertMany(
  //     [
  //       {
  //         nama: 'Taufik',
  //         email: 'taufik@gmail.com',
  //       },
  //       {
  //         nama: 'irvan',
  //         email: 'irvan@gmail.com',
  //       },
  //     ],
  //     (err, result) => {
  //       if (err) return console.log('Gagal menambahkan data');
  //       console.log(result);
  //     }
  //   );

  // Menampilkan semua data yang ada di collection mahasiswa
  //   console.log(
  //     db
  //       .collection('mahasiswa')
  //       .find()
  //       .toArray((err, result) => {
  //         console.log(result);
  //       })
  //   );

  // Menampilkan data berdasarkan kreteria
  //   console.log(
  //     db
  //       .collection('mahasiswa')
  //       .find({
  //         _id: ObjectId('63101e7a37f85fef0602e7a9'),
  //       })
  //       .toArray((err, result) => {
  //         console.log(result);
  //       })
  //   );

  //   Mengubah 1 data
  //   db.collection('mahasiswa').updateOne(
  //     {
  //       _id: ObjectId('63101e7a37f85fef0602e7a9'),
  //     },
  //     {
  //       $set: {
  //         email: 'fachrurriza@gmail.com',
  //       },
  //     }
  //   );

  // Menghapus 1 data
  //   db.collection('mahasiswa')
  //     .deleteOne({
  //       nama: 'irvan',
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // menghapus lebih dari 1 data
  db.collection('mahasiswa')
    .deleteMany({
      nama: 'Irvan',
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
