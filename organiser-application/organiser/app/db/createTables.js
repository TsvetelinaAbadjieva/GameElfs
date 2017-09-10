var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
 // password: "qwe123",
  password: "",

  database: "gameelfs"
});

con.connect(function (err) {

  if (err) throw err;
  console.log("Connected!");

  var sqlUser = "CREATE TABLE gameelfs.user (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), token VARCHAR(255))";
  var sqlResult = "CREATE TABLE gameelfs.result (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT(11) NOT NULL, result INT(11) NOT NULL, date DATE NOT NULL) ;";

  con.query(sqlUser, function (err, result) {
    if (err) throw err;
    console.log("Table User created");
  });

  con.query(sqlResult, function (err, result) {
    if (err) throw err;
    console.log("Table Result created");
  });

});
