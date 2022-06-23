const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cdac',
  database: 'wptexam',
  port: 3306,
});

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/update', function (req, res) {
  //console.log('reading input ' + req.query.);
  let bookid = parseInt(req.query.id);
  let bookname = req.query.name;
  let bookprice = parseInt(req.query.price);

  console.log(bookid, typeof bookid);
  console.log(bookname, typeof bookname);
  console.log(bookprice, typeof bookprice);
  sql = 'update book set bookname=?, bookprice=? where bookid=?';
  connection.query(sql, [bookname, bookprice, bookid], (err, result) => {
    if (err) {
      console.log('DATA IS NOT UPDATED IN DATA BASE');
    } else {
      if (result.affectedRows > 0) {
        console.log('SUCESSFULLY DATA IS UPDATED');
      }
    }
  });
  // res.end('UPDATED..!');
});

app.get('/select', function (req, res) {
  //console.log('reading input ' + req.query.);
  let bookid = parseInt(req.query.id);
  let bookname = req.query.name;
  let bookprice = parseInt(req.query.price);

  console.log(bookid, typeof bookid);
  console.log(bookname, typeof bookname);
  console.log(bookprice, typeof bookprice);
  sql = 'select * from book';
  connection.query(sql, [], (err, result) => {
    if (err) {
      console.log('DATA IS NOT IN DATA BASE' + err);
    } else {
      if (result.affectedRows > 0) {
        console.log('SUCESSFULLY DATA IS SELECTED');
      }
    }
  });
  // res.end('UPDATED..!');
});
app.listen(8081, function () {
  console.log('server listening at port 8081...');
});
