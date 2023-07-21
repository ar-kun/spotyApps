const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Import the path module

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'songs',
});

// Cek koneksi database
connection.connect(function (error) {
 if (!!error) {
  console.log(error);
 } else {
  console.log('Koneksi Berhasil!');
 }
});

// Halaman Home yang manampilkan semua data song
app.get('/', (req, res) => {
 connection.query('SELECT * FROM list', (error, results) => {
  res.render('home.ejs', { list: results });
 });
});

// Menampilkan detail dari song
app.get('/detail/:id', (req, res) => {
 const id = req.params.id;
 connection.query('SELECT * FROM list WHERE id = ?', [id], (error, results) => {
  res.render('detail.ejs', { song: results[0] });
 });
});

app.get('/most-popular', (req, res) => {
 connection.query('SELECT * FROM list ORDER BY popularity DESC', (error, results) => {
  res.render('most.ejs', { list: results });
 });
});

app.listen(3000, () => {
 console.log('Server is running on http://localhost:3000/');
});
