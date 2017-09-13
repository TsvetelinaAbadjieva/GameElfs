const express = require('express');
const app = express();

var http = require('http').Server(app);
var mysql = require('mysql');
var fc = require('../db/org_queries');
var path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var hashedPassword = passwordHash.generate('password123');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); next();
});

// routes for view navigation start

app.get('/', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../public/index1.html'));
});
app.get('/home', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../src/events/home.js'));
});
app.get('/registration', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../src/events/registration.js'));
});
app.get('/login', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../src/events/login.js'));
});
app.get('/projectDashboard', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../src/events/projectDashboard.js'));
});
app.get('/style', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../public/styles/styles.css'));
});
app.get('/help', function (req, res) {

  res.sendFile(path.resolve(__dirname + '/../../src/functions/helpFunctions.js'));
});

// routes for view navigation end

//begin routes for dbRequests
//working
app.post('/register', function (req, res) {

  //res.send(fc.joinTables(1));
  // var user = {
  //   firstName: 'Dima',
  //   lastName: 'Angelova',
  //   username: 'd_angelova',
  //   email: 'd_angelova@gmail.com',
  //   password: '123456'
  // };
  //req.body = user;
  req.body.password = passwordHash.generate(req.body.password);
  console.log(req.body);
  fc.insertUser(req.body, function (result) {
    console.log(result);
    res.json(result);
  });

});
console.log(hashedPassword);
/*
app.get('/', function (req, res) {
  var data = {
    "Data": ''
  };
  data['Data'] = 'welcome';
  res.json(data);
});

//module.exports = function(app) {


app.post('/result', function (req, res) {

  //res.send(fc.joinTables(1));
  fc.insertResult(req.body, function (err, res) {
    if (err) {
      throw err;
    }
    res.send('Record inserted');
  });
});



app.get('/login', function (req, res) {

//  var user = { username: 'Vanya', password: '12345', email: 'vanya@gmail.com', id:4 };
  var token = '';
  fc.checkUser(res, req.body, function (res, err, response) {
    if (err) {
      res.json({ status: 400, message: 'User not found!' })
    }
    else {
      console.log(response);
      var resp = JSON.parse(response);
      const token = jwt.sign(req.body, 'someSecretKey');
      console.log(token);
      res.json({
        token: token,
        response: resp,
        id: response.id,
        username: response.username
      });
    }
  });
});
//working
app.post('/result', ensureToken, function (req, res, next) {

  //var id = req.params.id;
  //var result = req.body.result;
  jwt.verify(req.token, 'someSecretKey', function (err,req) {

    if (err) {
      res.sendStatus(403).message('Operation impossible!');
    }
    else {
      var decodedToken = jwt.decode(req.token);
      fc.insertResult(res, decodedToken.id, req.body.result, function (res, error, data) {
        if (error) {
          res.json({ error: 'Result is Not inserted' })
        }
        else {
          res.json({ status: 200, message: 'Record inserted' });
        }
      });
    }
  })
});

app.get('/results/:id', ensureToken, function (req, res, next) {

  //var id = req.params.id;
  var token = req.token;
  jwt.verify(req.token, 'someSecretKey', function (err, req) {

    if (err) {
      res.sendStatus(403);
    }
    else {
      var decodedToken = jwt.decode(token);
      console.log('---')
      console.log(decodedToken);
      console.log('---')
      fc.getResultCollection(res, decodedToken.id,  function (res, error, data) {
        if (error) {
          res.json({ error: 'No results found' });
        }
        else {
          res.json({ status: 200, data: data });
          console.log(data);
        }
      });
    }
  })
});
//working code
app.get('/user/:id', function (req, res) {
  console.log(req.params.id);
  fc.getUser(req.params.id, function (data) {
    if (data) {
      res.json({ data: data, token: req.token });
      console.log(data)
    }
    else {
      res.json({ status: '404 user not found!' });
    }
  });
});

function ensureToken(req, res, next) {

  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

*/

module.exports = app;
app.listen(8000, function () {
  console.log('PMS app listening on port 8000!')
});
