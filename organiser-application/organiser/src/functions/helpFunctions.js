validateUsername = function (username) {

    var message = '';
    if (username == '') {
        return false;
    }
    if (username.length < 3) {
        return false;
    }
    var patt = /^[a-zA-Z\-]+$/;
    var res = patt.test(username);

    if (!res) {
        return false;

    } else {
        return true;
    }
    return true;
},

    validateEmail = function (email) {

        var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email == '') return false;
        var res = patt.test(email);
        if (!res) {
            return false;
        } else {
            return true;
        }
    },

    validatePassword = function (password) {

        if (password.length < 6) {
            return false;
        }
        var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        var res = patt.test(password);

        if (!res) {
            return false;

        } else {
            return true;
        }
    },

    escapeString = function (str) {
        var safeStr = '';
        safeStr = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return safeStr;
    }
