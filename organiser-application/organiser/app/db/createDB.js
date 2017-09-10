var mysql = require('mysql');

var con = mysql.createConnection({
  host:     "localhost",
  user:     "root",
 // password: "qwe123"
  password: ""

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE gameelfs", function (err, result) {
    if (err) throw err;
    console.log("Database gameelfs created");
  });
});
