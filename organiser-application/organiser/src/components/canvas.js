import React from "react";
import fm from "../functions/functionalModule";
import Hero from "../functions/hero";

//var fm = require('../functions/functionalModule');

export class Canvas extends React.Component {

  constructor(props) {
    super(props);
    //  const context = document.getElementById('canvas').getContext('2d');
    const dim = 9;
    const canvas = document.getElementById('canvas');
    this.state = {
      message:'',
      selectedHero: {},
      selectedEnemi: {},
      result:5
    };
    this.padding = 5;
    this.canvas = '';
    this.canvasWidth = "900px";
    this.canvasHeight = "900px";
    this.ctx = '';
    this.width = "900px";
    this.dim = dim;
    this.style = {
      strokeStyle: 'black',
      fillStyle: 'white'
    };
    this.stopSearch = false;
    this.cellCollection = [];
    this.gamerHeros = [];
    this.computerHeros = [];
  }
  initFillCanvas() {

  }
  componentDidMount() {

    var cellCol = [];
    this.canvas = document.getElementById('canvas');
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.cellWidth = fm.calculateWidth(this.canvas, this.dim);

    cellCol = fm.fillCanvas(this.ctx, this.dim, this.style, this.cellWidth, this.cellCollection);
    this.createHeros();
    //fm.redrawCanvas(this.ctx, this.canvas, this.gamerHeros, this.computerHeros, this.cellCollection,this.padding);
  }

  createHeros() {

    var avatars = [
      { type: 'knight', url: '/images/knight.jpeg' },
      { type: 'dwarf', url: '/images/dawrf1.jpeg' },

      { type: 'elf', url: '/images/elffemale.jpeg ' },
      { type: 'knight', url: '/images/knight2.jpeg' },

      { type: 'dwarf', url: '/images/dawrf2.png' },
      { type: 'elf', url: '/images/elfmale.jpg' },
    ];
    var positionGamer = [];
    var positionEnemy = [];
   // var padding = 3;
    for (var j = 0; j < this.dim; j++) {

      var indexGamer = { i: 0, j: j };
      var indexComp = { i: (this.dim - 1), j: j };

      if (j != 2 && j != 5 && j != (this.dim - 1)) {

        var gamerPos = fm.findCellByIndex({ i: 0, j: j }, this.cellCollection);
        var compPos =  fm.findCellByIndex({ i: (this.dim - 1), j: j }, this.cellCollection);

        gamerPos.setState(1);
        compPos.setState(1);
        positionGamer.push(gamerPos);
        positionEnemy.push(compPos);
      }
    }
    for (var i = 0; i < 6; i++) {

      if (i == 0 || i == 3) {

        var heroGamer = new Hero(avatars[i].type, 8, 3, 15, 1, 1, positionGamer[i], avatars[i].url, false);
        var heroEnemy = new Hero(avatars[i].type, 8, 3, 15, 1, 1, positionEnemy[i], avatars[i].url, true);
      } else if (i==1 || i==4) {

        var heroGamer = new Hero(avatars[i].type, 6, 2, 12, 2, 3, positionGamer[i], avatars[i].url, false);
        var heroEnemy = new Hero(avatars[i].type, 6, 2, 12, 2, 3, positionEnemy[i], avatars[i].url, true);
      } else if (i==2 || i==5) {

        var heroGamer = new Hero(avatars[i].type, 5, 1, 10, 3, 5, positionGamer[i], avatars[i].url, false);
        var heroEnemy = new Hero(avatars[i].type, 5, 1, 10, 3, 5, positionEnemy[i], avatars[i].url, true);
      }
      heroGamer.fillRect(this.ctx);
      heroGamer.drawAvatar(this.ctx, this.padding);

      heroEnemy.fillRect(this.ctx);
      heroEnemy.drawAvatar(this.ctx, this.padding);

      this.gamerHeros.push(heroGamer);
      this.computerHeros.push(heroEnemy);
    }
  }
  componentDidUpdate() {
    fm.redrawCanvas(this.ctx, this.canvas, this.gamerHeros, this.computerHeros, this.cellCollection,this.padding);
  }

  findIndexHeroByPoint(gamerHeros, point) {

    for(var i=0; i< gamerHeros.length; i++) {

      var heroIndex = fm.findIndexOfElement(point, [gamerHeros[i].position]);
      if (heroIndex)
          return heroIndex;
    }
    return null;
  }

  isSelectedHero(index) {
    if(this.position.index === index)
    return this;
  }

  onShowPositions(evt) {

    var _this = this;
    var srtPoint = {x:evt.pageX, y:evt.pageY};
    var hero = fm.findHeroByPoint(srtPoint, this.gamerHeros);
    if(!hero) return;
    console.log(hero);
    //this.setState({selectedHero: hero});
    var speed = hero.speed;
    var currentIndex = hero.position.index;
    var canvasArray = this.cellCollection;
    fm.redrawCanvas(this.ctx, this.canvas, this.gamerHeros,hero.freeCellColletion, this.computerHeros, this.cellCollection,this.padding);
    //fm.markFreeCell({i:1,j:1}, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
    console.log(hero.freeCellColletion);
    var count =0; //for control the search of free cells in the area next to hero
    for (var i=0; i<=speed+1; i++) {

      var stopSearchLeftUp = false;
      var stopSearchRightUp = false;
      var stopSearchLeftDown = false;
      var stopSearchRightDown = false;

      var k = speed - i;
      for( var j=0; j<=k; j++) {

        if(count==0) {
          if(!stopSearchLeftUp) {
            stopSearchLeftUp = fm.checkLeftUp(currentIndex, i, 1, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
          }
          if(!stopSearchRightUp) {
            stopSearchRightUp = fm.checkRightUp(currentIndex, i, 1, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
          }
          if(!stopSearchLeftDown) {
            stopSearchLeftDown = fm.checkLeftDown(currentIndex, i, 1, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
          }
          if(!stopSearchRightDown) {
            stopSearchRightDown = fm.checkRightDown(currentIndex, i, 1, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
          }
          count++;
        }else {
              if(!stopSearchLeftUp) {
                stopSearchLeftUp = fm.checkLeftUp(currentIndex, i, j, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
              }
              if(!stopSearchRightUp) {
                stopSearchRightUp = fm.checkRightUp(currentIndex, i, j, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
              }
              if(!stopSearchLeftDown) {
                stopSearchLeftDown = fm.checkLeftDown(currentIndex, i, j, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
              }
              if(!stopSearchRightDown) {
                stopSearchRightDown = fm.checkRightDown(currentIndex, i, j, hero.freeCellColletion, canvasArray, this.gamerHeros, this.computerHeros, this.canvas, this.ctx, this.padding);
              }
        }//end else
      }//end for
    }//end for
    var btnMove = document.getElementById('move');
    btnMove.removeAttribute('hidden');
    var btnMove = document.getElementById('shoot');
    btnMove.removeAttribute('hidden');
  }
  onMove() {

  }
  onShoot() {

  }
  onInsertResult() {

    var _this = this;
    var result = this.state.result;
    var date = new Date().getDate();
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST','http://localhost:8000/result',true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Authorization','Bearer '+ window.localStorage.getItem('token'));
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        _this.setState({ message: xhttp.responseText });
      }
    }
    xhttp.send(JSON.stringify({result: result}));

  }
  render() {

    return (
      <div>
        <button id="move" name="move" onClick={this.onMove.bind(this)} style={{width:"100px", height:"30px"}} hidden>Move</button>
        <button id="shoot" name="shoot" onClick={this.onShoot.bind(this)} style={{width:"100px", height:"30px"}} hidden>Shoot</button>
        <button id="result" name="result" onClick={this.onInsertResult.bind(this)} style={{width:"100px", height:"30px"}}>Result</button>
        <p>{this.state.message}</p>
        <div>
          <canvas id="canvas" width="900px" height="900px" onClick={this.onShowPositions.bind(this)} style={{ border: "1px solid black", backgroundColor: "white" }}></canvas>
        </div>
      </div>
    );
  }
}
