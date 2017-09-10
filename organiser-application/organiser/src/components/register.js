import React from "react";
import { Link } from "react-router";
import { TextEncoderLite } from "text-encoder-lite";
import { base64js } from "base64-js";


export class Register extends React.Component {


    constructor(props) {
        super(props)
        const BASE_URL = this.props.params.BASE_URL;
        this.state = {
            username: '',
            email: '',
            passsword: '',
            message: '',
            token: ''

        }
        this.onRegister = this.onRegister.bind(this);

    }
    updateInputUsername(evt) {
        this.setState({
            username: evt.target.value,
        });
    }
    updateInputEmail(evt) {
        this.setState({
            email: evt.target.value,
        });

    }
    updateInputPassword(evt) {
        this.setState({
            password: evt.target.value
        });
        console.log(evt.target.value)
    }

    onRegister(e) {
        alert('click');
        e.preventDefault();
        var _this = this;
        if (this.validateUsername(this) && this.validateEmail(this) && this.validatePassword(this)) {

            var user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
                //passsword: this.base64EncodingUTF8(this.state.password)
            };
            console.log(user);
            var userString = JSON.stringify(user);
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST',  'http://localhost:8000/register', true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function () {//Call a function when the state changes.

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    _this.setState({ message: xhttp.responseText });
                }
            }
            xhttp.send(userString);
            // xhttp.send(user);

        }
        return true;
    }
    validateUsername(that) {

        if (that.state.username == '') {
            this.updateMessage('Field username is required!', that);
            return false;
        }
        if (that.state.username.length < 5) {
            this.updateMessage('Field username must be at least 5 symbols!', that);
            return false;
        }
        return true;
    }

    validateEmail(that) {

        var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var res = patt.test(that.state.email);
        if (!res) {
            this.updateMessage('Please, enter a valid email', that);
            return false;
        } else {
            this.updateMessage('', that);
            return true;
        }
    }

    validatePassword(that) {

        var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        var res = patt.test(that.state.password);

        if (!res) {
            this.updateMessage('Password must be at least 6 symbols included one or more upercase and numbers', that);

            return false;
        } else {
            this.updateMessage('', that);
            return true;
        }
        if (that.state.passsword.length < 6) {
            this.updateMessage('Password must be at least 6 symbols', that);

            return false;
        }
    }

    hashCode(pass) {
        var hash = 0;
        if (pass.length == 0) return hash;
        for (var i = 0; i < pass.length; i++) {
            var char = pass.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash += hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    updateMessage(message, that) {

        that.setState({
            message: message
        });
    }

    base64EncodingUTF8(str) {

        var encoded = TextEncoderLite('utf-8').encode(str);
        var b64Encoded = base64js.fromByteArray(str);
        return b64Encoded;
    }

    render() {


        return (
            <div className="col-md-6 form-group">Login Form
                <form action="">
                    <div>
                        <p><label for="exampleInputEmail1">Username</label></p>
                        <p><input type="text" className="form-group" id="username" name="username" value={this.state.username} onChange={evt => this.updateInputUsername(evt)} aria-describedby="emailHelp" placeholder="Enter username" /></p>

                        <p><label for="exampleInputEmail1">Email address</label></p>
                        <p><input type="email" className="form-group" id="email" name="email" value={this.state.email} onChange={evt => this.updateInputEmail(evt)} aria-describedby="emailHelp" placeholder="Enter email" /></p>
                        <p><label for="exampleInputEmail1">Password</label></p>
                        <p><input type="text" className="form-group" id="password" name="password" value={this.state.password} onChange={evt => this.updateInputPassword(evt)} placeholder="Enter password"/></p>
                    </div>

                    <p><button onClick={this.onRegister} id="login" name="register" type="submit">Register</button></p>
                    <p>{this.state.username} -- {this.state.email}--{this.state.password}--{this.state.message}</p>
                    <p>{this.state.message}</p>
                </form>
            </div>
        );


    }
}
