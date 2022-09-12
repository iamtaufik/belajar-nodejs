// Core Module
// File System
const fs = require('fs')

// Menuliskan string ke file secara synchronous
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara synchronous')
// } catch (error) {
//     console.log(error);
// }

// Menuliskan string file secara asynchronous
// fs.writeFile('data/test.txt', 'Menuliskan string secara asnychronous',(err) => {
//     console.log(err);
// })

// membaca file

// const data = fs.readFileSync('data/test.txt','utf-8')
// console.log(data);

// fs.readFile('data/test.txt', 'utf-8', (err,data) => {
//     if (err) throw err;
//     console.log(data);
// })

// Readline

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
  
rl.question('Masukkan nama anda: ', (nama) => {
    rl.question('Masukkan no HP: ', (nohp) => {
        const contact = { nama,nohp }
        const file = fs.readFileSync('data/contact.json', 'utf-8')
        const contacts = JSON.parse(file)
        
        contacts.push(contact);

        fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
        console.log("Terimakasih")
        rl.close()
    })
})
