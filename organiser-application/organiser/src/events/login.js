document.getElementById('loginLink').addEventListener('click', function(){
        document.getElementById('login').style.display = '';
        document.getElementById('register').style.display = 'none';
});

document.getElementById('btnLogin').addEventListener('click', function (e) {

    e.preventDefault();
    var email = escapeString(document.getElementById('inputEmail').value);
    var password = escapeString(document.getElementById('inputPassword').value);
    var alert = document.getElementById('alertLogin');
    var errorMessage = '';

    if (validateEmail(email) && validatePassword(password)){

        var user = {
            email: email,
            password: password
        };
        console.log(user);
        var userString = JSON.stringify(user);
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET',  'http://localhost:8000/login', true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
              var resp = JSON.parse(xhttp.responseText);
              localStorage.setItem('token', resp.token);
              localStorage.setItem('id', resp.id);
                alert(message);
                console.log(xhttp.responseText.message);
            }
        }
        xhttp.send(userString);
    }
    else {
      alert.style.display = 'block';
      alert.innerText = 'Username or password might be incorrect';
    }

    window.location.href ='http://localhost:8000/#projectDashboard';
    document.getElementById('login').removeAttribute('hidden');
    document.getElementById('login').style.display = "block";

    var alert = document.getElementById('alertLogin');
    alert.classList.remove('alert-danger');
    alert.classList.add('alert-success');
    alert.style.display = 'block';
    alert.innerText = message;
    //var form = document.getElementById('registerForm');
  //  document.getElementById('register').removeChild(form);

});
