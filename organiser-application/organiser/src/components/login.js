import React from "react";
import {Link} from "react-router";

import {browserHistory} from "react-router";


export class Login extends React.Component {

 constructor(props){
        super(props)

        const _URL = "http://localhost:8000/login";
        console.log(this._URL);
        var id = '';
        this.state = {
            username : '',
            passsword : '',
            message:''
        }

}
updateInputUsername(evt) {
    this.setState({
      username: evt.target.value,
    });
    console.log(evt.target.value)
}
updateInputPassword(evt) {
   this.setState({
      password: evt.target.value
  });
  console.log(evt.target.value)
}

handleClick(){

        if(this.state.username !=='' && this.state.password !=='') {
            var dataAsObj = {
                username: this.state.username,
                password: this.state.passsword
            }

            var data = JSON.stringify(dataAsObj);
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST',this.BASE_URL+"login",true);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);
                    this.setState({
                        username: data.username,
                        token:    data.token,
                        id:       data.id
                    });
                    browserHistory.push(`/canvas?id=${this.state.id}`)
                }
            }
            xhttp.send(data);
        } else {
            this.showMessage('Fields are required!', this);
        }

}

showMessage(message, that) {
  that.setState({
      message: message
  });
}

onLogin(e) {

  alert('click');
  e.preventDefault();
  var _this = this;

  if (!this.checkEmptyFields()) {

  var user = {
      username: this.state.username,
      password: this.state.passsword
            //passsword: this.base64EncodingUTF8(this.state.passsword)
  };
  console.log(user);
  var userString = JSON.stringify(user);
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET',  'http://localhost:8000/login', true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function () {//Call a function when the state changes.

    if (xhttp.readyState == 4 && xhttp.status == 200) {

      var resp = JSON.parse(xhttp.responseText);
      _this.setState({id      :xhttp.responseText.id,
                      username: xhttp.responseText.username});
      _this.setState({ message: xhttp.responseText +"/"+resp.username });

      localStorage.setItem('token', resp.token);
      _this.id = resp.token.id;
    }
  }
  xhttp.send(userString);
  }
  else {
    this.showMessage('Fields are required!', this);
  }
}

checkEmptyFields() {

  if(this.state.username == '' || this.state.password =='')
    return true;
    return false;
}

  render() {
         return(
            <div className="col-md-6 form-group">Login Form
                <div>
                    <p><label for="exampleInputEmail1">Email address</label></p>
                    <p><input type="email" className="form-group" id="username" name="username" value={this.state.username} onChange={evt => this.updateInputUsername(evt)} aria-describedby="emailHelp" placeholder="Enter email"/></p>
                    <p><label for="exampleInputEmail1">Password</label></p>
                    <p><input type="text" className="form-group" id="password" name="password" value={this.state.password} onChange={evt => this.updateInputPassword(evt)}/></p>
                </div>

                <p><button onClick={(e)=>this.onLogin(e)} id="login" name="login" type="submit">Login</button></p>
                <p>{this.state.message}</p>
            </div>
        );
  }
}
