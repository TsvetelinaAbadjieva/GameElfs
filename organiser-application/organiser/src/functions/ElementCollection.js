export const directionCollection = [ 'right','left', 'up', 'down','upLeft','upRight','downLeft', 'downRight','leftUp','leftDown','rightUp','rightDown'];
export const dim=9;
//export const context= document.getElementById('canvas').getContext('2d');

  Element = function(index, startPoint, width, state, strokeStyle, fillStyle) {

  this.index = index;
  this.startPoint = startPoint;
  this.width = width;
  this.state = state;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;

  this.draw = function(ctx) {

    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.rect(this.startPoint.x, this.startPoint.y, this.width, this.width);
    ctx.stroke();
  };

  this.setState = function(state) {
    this.state = state;
  };

  this.getState = function(state) {
    return this.state;
  };

  this.setFill = function(fillStyle) {
    this.fillStyle = fillStyle;
  };

  this.fillRect = function(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(this.startPoint.x, this.startPoint.y, this.width, this.width);
  };

  this.contains = function(point) {

    if((point.x >= this.startPoint.x) && (point.x <= this.startPoint.x + this.width)
      && (point.y >= this.startPoint.y) && (point.y <= this.startPoint.y + this.width))
     return true;

     return false;
  };

  this.addImg = function(ctx, img, padding){
    ctx.drawImage(img, this.startPoint.x+padding, this.startPoint.y+padding, this.width-padding, this.height-padding);
  }

};

exports.getPosition = function(el) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
};

exports.calculateWidth = function(canvas, dim) {
  return Math.floor(canvas.width/dim);
};

exports.fillCanvas = function(ctx, style, canvasArray) {

 var startPnt = {x:0, y:0};
//  var startPnt = getPosition(canvasGamer);
  var width =   exports.calculateWidth(canvasArray, dim);

  for (var i=0; i<dim; i++) {
      for(var j=0; j<dim; j++) {

          var index = {i:i, j:j};
          startPnt = {x: j*width, y: i*width};

          var element = new Element(index, startPnt, width, 0, style.strokeStyle, style.fillStyle);

          element.draw(ctx);
          if(i<dim && j<dim) {
            canvasArray.push(element);
          }
      }
  }
  return canvasArray;
};

//fillCanvas(gamerCtx, enemyCtx, style);

// get index from gamer canvas array or from enemy canvas array having mouse position
exports.findIndexOfElement = function(startPnt,array) {

  for(var i=0; i<array.length; i++) {

      var element = array[i];
      if(element.contains(startPnt)){

        var index = element.index;
        return index;
      }
   }
  return null;
},

//set all canvas elements as free
exports.setFreeAll = function(arrayElementCollection) {

var len = arrayElementCollection.length;
  for (var i=0; i<len ;i++) {
    arrayElementCollection[i].setState(0);
  }
},

exports.setFullAll = function(arrayElementCollection) {

var len = arrayElementCollection.length;
  for (var i=0; i<len ;i++) {
    arrayElementCollection[i].setState(1);
  }
},

//get element containig point from the canvasArray
exports.getElementHavingPoint = function(startPnt,array, canvas) {

  var width = exports.calculateWidth(canvas, dim);
  for(var k=0; k< array.length; k++) {

      var element = array[k];
     // var i = Math.floor(startPnt.x/width);
     // var j = Math.floor(startPnt.y/width);
   // if(element.index.i == i && element.index.j == j) {
    if(element.contains(startPnt)){
       // element.setFill('green');
        //element.fillRect(gamerCtx);
        return element;
      }
   }
  return null;
},


//find cell on canvas area by index in order to later to be checked as full
exports.findCellByIndex = function(startIndex, array) {

   for(var i=0; i<array.length; i++) {

      if(array[i].index.i == startIndex.i && array[i].index.j == startIndex.j){
          return array[i];
      }
   }
  return null;
},

//init a ship postion on canvas
exports.tryPlaceHeroCanvas = function(startPnt, numCells, canvasArray, hero, directionCollection) {

  var possible = true;
  var element = exports.getElementHavingPoint(startPnt, canvasArray);

    if(element) {

      var startIndex = element.index;

      var index =  element.index;

      for (var i=0; i< directionCollection.length; i++) {

        var direction = directionCollection[i];
        var hero = {
            startIndex: startIndex,
            direction:direction,
            body: []
        };
        var indexCollection = exports.checkFreeCellsInDirection(startPnt, numCells, canvasArray, direction);

        if (indexCollection) {

            hero.direction = direction;
            hero.body = exports.createShipBody(indexCollection, canvasArray);
            //break;
        }
      } return hero;
    }
   return false;
},

exports.createShipBody = function(indexCollection, canvasArray) {

  var body = [];
  if(indexCollection && (indexCollection.length > 0)) {
    for (var i=0; i<indexCollection.length; i++) {

      var index = indexCollection[i];
      var el = exports.findCellByIndex(index, canvasArray);
      if(el) {
        body.push(el);
      }
    }
  }
  return body;
},

exports.checkFreeCellsInDirection =function (startPnt, numCells, canvasArray, direction) {

var elem = exports.getElementHavingPoint(startPnt, canvasArray);
if(elem) {
    var index = exports.getElementHavingPoint(startPnt, canvasArray).index;
    var indexCollection = [];

      for (var k = 0; k<numCells; k++) {

        if(index) {
          if((index.i>-1) && (index.i <= dim) && (index.j>-1) && (index.j<= dim)){

              var cellByIndex = exports.findCellByIndex(index, canvasArray);

                if (!cellByIndex || cellByIndex.state == 1) {
                  return false;
                }
                else {

                  indexCollection.push({i: index.i, j: index.j});
                  switch (direction) {

                      case 'left' :  index.j -= 1; break;
                      case 'right':  index.j += 1; break;
                      case 'up'   :  index.i -= 1; break;
                      case 'down' :  index.i += 1; break;
                  }
                }
          } else return false;
        } else  return false;
      }

      if (indexCollection.length == numCells) {
            return indexCollection;
      }
  }
  else return false;
},

exports.inverseDirection = function(direction) {

  if (direction == 'up') {
      direction = 'down';
  }
  else if (direction =='down') {
    direction = 'up';
  }
  else if (direction == 'left') {
    direction = 'right';
  }
  else {
    direction = 'left';
  }
 return direction;
},

//rotate ship
/*
exports.rotate = function(ship, direction, canvasArray, ctx) {

  var first = ship.body[0];
  var srtPoint = first.startPoint;
  console.log('startPoint exists');
  console.log(srtPoint);

  var numCells = ship.body.length;
  var indexCollection = exports.checkFreeCellsInDirection (srtPoint, numCells, canvasArray, direction);
  console.log('indexCollection');
  console.log(indexCollection);
  if(indexCollection && indexCollection.length>0) {
    for(var i=1; i<indexCollection.length; i++) {

      var index = indexCollection[i];

      var el = exports.findCellByIndex(index, canvasArray);
      var stroke = el.strokeStyle;
      var fill = el.fillStyle;
      el.setState(1);
      el.setFill('green');
      el.fillRect(ctx);
      ship.body.push(el);

      ship.body[i].setState(0);
    //  ship.body[i].index = index;
      ship.body[i].setFill(fill);
      ship.body[i].strokeStyle = stroke;
    }
    ship.body.splice(1,numCells-1);
    exports.redrawCanvas(ctx, canvasGamer, gamerFleet, gamerArray);
  }
},
*/
// move a ship to up, to down, to left, to right
  exports.moveStright = function(ship, direction, canvasArray, ctx,gamerFleet, gamerArray) {

  var first = ship.body[0];
  var srtPoint = first.startPoint;

  var numCells = ship.body.length;
    if(direction == 'left' || direction == 'right') {

      for( var j=0; j< numCells; j++) {
        var srtPoint = ship.body[j].startPoint;
        var indexCollection = exports.checkFreeCellsInDirection (srtPoint, 1, canvasArray, direction);
        if(!indexCollection ) {
          return false;
        }
      }
    }
    else if(direction == 'up') {
      var index = ship.body[0].index;
      index.i-=1;
      var el = exports.findCellByIndex(index, canvasArray);
      if(!el || el.state == 1)
      return false;
    }
    else {
      var index = ship.body[numCells-1].index;
      index.i+=1;
      var el = exports.findCellByIndex(index, canvasArray);
      if(!el || el.state == 1)
      return false;
    }
    for(var i=0; i<numCells; i++) {

      var index = ship.body[i].index;
      switch (direction) {

          case 'left' :  index.j -= 1; break;
          case 'right':  index.j += 1; break;
          case 'up'   :  index.i -= 1; break;
          case 'down' :  index.i += 1; break;
      }
      var el = exports.findCellByIndex(index, canvasArray);
      var stroke = el.strokeStyle;
      var fill = el.fillStyle;
      el.setState(1);
      el.setFill('green');
      el.fillRect(ctx);
      ship.body.push(el);

      ship.body[i].setState(0);
      ship.body[i].setFill(fill);
      ship.body[i].strokeStyle = stroke;
      ship.body.splice(i-1,1);
    }
    exports.redrawCanvas(ctx, canvasArray, gamerFleet, gamerArray);

    console.log('ship.body BEFORE SPLICE');
    console.log(ship.body);

    console.log('ship.body AFTER SPLICE');
    console.log(ship.body);
},

//fleet- gamerFleet or enemy enemyFleet
//add to fleet count - number of ships
  exports.addToFleet = function(ship, fleet) {
    if(ship && ship.body.length>0)
        fleet.push(ship);
},

exports.markShipPosition = function(ship, ctx, canvas, fleet, arrayCopy) {

  exports.redrawCanvas(ctx,canvas, fleet, arrayCopy);

  if (ship){

    var cellCollection = ship.body;
    if(cellCollection.length>0) {
      for (var i=0; i<cellCollection.length; i++) {

        cellCollection[i].setFill('grey');
        cellCollection[i].fillRect(ctx);
     }
    }
  }
},


exports.drawShip = function(ship, ctx) {

  if(ship) {
    var cellCollection = ship.body;
    if(cellCollection.length > 0) {
      for (var i=0; i<cellCollection.length; i++) {

        cellCollection[i].setFill('green');
        cellCollection[i].fillRect(ctx);
        cellCollection[i].setState(1);
      }
    }
  }
},

exports.redrawCanvas = function(ctx, canvas, fleet, arrayCopy) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //fillCanvas(gamerCtx, enemyCtx, style);
  for (var i=0; i<arrayCopy.length; i++) {

    var el = arrayCopy[i];
        el.draw(ctx);
  }
  if(fleet.length >0) {
    for(var i=0; i< fleet.length; i++) {
          exports.drawShip(fleet[i],ctx);
    }
  }
},

exports.drawShipCollection = function(ctx, fleet) {

  for (var i=0; i<fleet.length; i++) {

     var ship = fleet[i];
     exports.drawShip(ship, ctx);
  }
}

//end module export
//module.export = ElCol;
