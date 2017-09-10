import React, { Component } from 'react';
import {render} from 'react-dom';
import './App.css';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import './functions/functionalModule'
import {Login} from './components/login';
import {Register} from './components/register';
import {Home} from './components/home';
import {Canvas} from './components/canvas';

const BASE_URL = 'http://localhost:8000/';

class GameApp extends Component {
  constructor(props) {
      super(props)

      this.state = {
          userId: this.props.id,
          periodCollection: [],
          priorityCollection: [],
          groupCollection: [],
          message: ''

      }
      this.getGroupCollection = this.getGroupCollection.bind(this)
      this.getPriorityCollection = this.getPriorityCollection.bind(this)
      this.getPeriodCollection  = this.getPeriodCollection.bind(this)
  }
  getPriorityCollection(callback) {

      var data = [];
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', 'http://localhost:8000/priority', true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.onreadystatechange = function() {//Call a function when the state changes.
          if (xhttp.readyState == 4 && xhttp.status == 200) {
                             console.log('In receiving data');

             this.callback(JSON.parse(xhttp.responseText), 'periodCollection');
              //this.callback(JSON.parse(xhttp.responseText));
          }
      }
     xhttp.send();


  }

  callback(data, selectCollection) {

      var select =[];
      if (data) {
          for (var i=0; i<data.length; i++) {

              var item =data[i];
              select.push(item);
          }
          switch(selectCollection) {
              case 'priorityCollection':
                      this.setState({ priorityCollection: select });
                      const { priorityCollection } = this.state.priorityCollection;
                      break;
              case 'groupCollection':
                      this.setState({ groupCollection: select });
                      const { groupCollection } = this.sate.groupCollection;
                      break;
              case 'periodCollection':
                      this.setState({ periodCollection: select });
                      const { periodCollection } = this.state.periodCollection;
                      break;
          }

          console.log(data);
      }
  }

  getPeriodCollection(callback) {

      var data = [];
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', 'http://localhost:8000/period', true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.onreadystatechange = function () {//Call a function when the state changes.
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              this.callback(JSON.parse(xhttp.responseText),'periodCollection');
             // var data = JSON.parse(xhttp.responseText);
             // if (data.length > 0) {
              //    this.setState({ periodCollection: data });
              //}
          }
      }
      xhttp.send();
      //return this.state.periodCollection;
  }
  getGroupCollection(callback) {

      var data = [];
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', 'http://localhost:8000/group', true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.onreadystatechange = function () {//Call a function when the state changes.
          if (xhttp.readyState == 4 && xhttp.status == 200) {

              this.callback(JSON.parse(xhttp.responseText),'groupCollection');
         /*     var data = JSON.parse(xhttp.responseText);
              if (data.length > 0) {
                  this.setState({ groupCollection: data });

              }
          */
          }
      }
      xhttp.send();
      //return this.state.groupCollection;
  }

  render() {

    return (

     <Router history={browserHistory}>
        <Route path={"/"} component={Home}/>
          <Route path={"Home"} component={Home}/>
          <Route path={"Login"} params={BASE_URL} component={Login}/>
          <Route path={"Register"} params={BASE_URL} component={Register}/>
          <Route path={"Canvas"} params={BASE_URL} component={Canvas}/>

    <p>Hello</p>
    </Router>
    );
    <Canvas/>

  }
}
/*          <IndexRoute component={Home}/>
*/
export default GameApp;
