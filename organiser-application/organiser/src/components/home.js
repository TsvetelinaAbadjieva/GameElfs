import React from "react";
import {Link} from "react-router";


export const Home =(props)=> {

   // render() {

         return(

            <div className="row">
                <div className="container">
                    <div className="container">
                        <nav className="navbar navbar-inverse navbar-static-top">
                            <ul className="menu">
                                <li><Link to={'/'} activeStyle={{color:"lightblue"}}>Home</Link></li>
                                <li><Link to={"/login/"} activeStyle={{color:"lightblue"}}>Login</Link></li>
                                <li><Link to={"/register"} activeStyle={{color:"lightblue"}}>Register</Link></li>
                                <li><Link to={"/canvas/"} activeStyle={{color:"lightblue"}}>Game</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="img">
                        <img src="http://hd.wallpaperswide.com/thumbs/city_of_elfs-t2.jpg" alt=""/>
                    </div>
                </div>
            </div>
        );


   //}
};
