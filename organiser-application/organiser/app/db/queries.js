var mysql = require('mysql');
var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    // password:   "qwe123",
    password: "",
    database: "game"
    //database: "gameelfs"
});

con.connect(function (err) {
    if (err) throw err;
});

exports.insertUser = function (user, func) {

    // var user = JSON.parse(user);
    if(exports.checkExistingUser(user)) {
      console.log(exports.checkExistingUser(user))
        return {message:'This user already exists!'};
    }
    else {
        var users = [];
        //INSERT INTO `user` (`name`) VALUES ('John');
        var sql = "INSERT INTO `user` (`username`, `password`, `email`) VALUES ?";
        users.push(user.username);
        users.push(user.password);
        users.push(user.email);
        // users.push(user.token);

        var values = [users];

        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            func(err, result.affectedRows);
        });
    }
};

exports.getUserCollection = function (func) {

    var sql = "SELECT * FROM user";
    var user = [];

    con.query(sql, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            user.push(result[i]);
        }
        console.log(result);
        func(JSON.stringify(user));
    });
};

exports.getResultCollection = function (res, id, func) {

    var sql = "SELECT * FROM result WHERE user_id = ?";
    var resultCollection = [];
        console.log(id);
    con.query(sql,[parseInt(id)], function (err, result) {

        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            resultCollection.push(result[i]);
        }
        console.log(result);
        func(res, err, resultCollection);
    });
};

exports.getUser = function (id, func) {

    var sql = "SELECT * FROM user WHERE id = ? LIMIT 1";
    var user = [];
    user.push(id);
    var values = [user]

    con.query(sql, [id], function (err, result) {
        if (err) throw err;
        console.log(result);
        func(JSON.stringify(result[0]));
    });
};

exports.updateToken = function (username, email, token) {

    //INSERT INTO `user` (`name`) VALUES ('John');
    var sql = "UPDATE user SET token = ? WHERE (username = ? AND email = ?);";
    con.query(sql, [username, email, token], function (err, result) {
        if (err) throw err;
        console.log("Number of records updated: " + result.affectedRows);
    });
};

exports.checkToken = function (id, token) {

    //INSERT INTO `user` (`name`) VALUES ('John');
    var sql = "SELECT * FROM user  WHERE (id = ? AND token =?) LIMIT 1;";
    con.query(sql, [id, token], function (err, result) {
        if (err) throw err;
        if (result) return true;
        return false;
        console.log("Number of returned rows: " + result.numRows);
    });
};

exports.checkUser = function (res, user, func) {

    var users = [];
    var sql = "SELECT * FROM user WHERE username = ? AND password = ? LIMIT 1";
    users.push(user.username);
    users.push(user.password);

    var values = [user.username, user.password];

    con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log('In query');
        console.log(result)
        func(res, err, JSON.stringify(result));
    });
};
exports.checkExistingUser = function (user) {

    var users = [];
    var sql = "SELECT * FROM user WHERE username = ? OR email = ? LIMIT 1";
    users.push(user.username);
    users.push(user.email);

    var values = [user.username, user.email];

    con.query(sql, values, function (err, result) {
        if (err) throw err;
        if(result.numRows >0)
        return true;
        return false;
    });
};
//DONT TOUCH THIS CODE - stupid, but working :)!!
exports.insertResult = function (res, user_id, result, func) {

    var sql = "INSERT INTO result (result, user_id, date) values (?,?, NOW())";
  //  var values = [[result, parseInt(id)]];

    con.query(sql, [parseInt(result), parseInt(user_id)], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted into Group: " + result.affectedRows);
        func(res, err, result);
    });
};
exports.checkUser(null, {username:"user5", password:"user5ABV"},function(err, result ){
  //console.log(JSON.stringify(result));
});
