require('./hero');
Element = function (index, startPoint, width, state, strokeStyle, fillStyle) {
  this.index = index;
  this.startPoint = startPoint;
  this.width = width;
  this.state = state;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;

  this.draw = function (ctx) {

    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.rect(this.startPoint.x, this.startPoint.y, this.width, this.width);
    ctx.stroke();
  };

  this.setState = function (state) {
    this.state = state;
  };

  this.getState = function (state) {
    return this.state;
  };

  this.setFill = function (fillStyle) {
    this.fillStyle = fillStyle;
  };

  this.fillRect = function (ctx) {

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillRect(this.startPoint.x, this.startPoint.y, this.width, this.width);
    ctx.stroke();
  };

  this.contains = function (point) {

    if ((point.x >= this.startPoint.x) && (point.x <= (this.startPoint.x + this.width))
      && (point.y >= this.startPoint.y) && (point.y <= (this.startPoint.y + this.width))){
        //console.log('In contais---true')
        return true;
      }
    return false;
  };

  this.addImg = function (ctx, img, padding) {
    ctx.drawImage(img, this.startPoint.x + padding, this.startPoint.y + padding, this.width - padding, this.height - padding);
  };

}// end class


//end of functions

var fm = {

  calculateWidth: function (canvas, dim) {
    return Math.floor(canvas.width / dim);
  },

  fillCanvas: function (ctx, dim, style, width, canvasArray) {
    var startPnt = { x: 0, y: 0 };
    //  var startPnt = getPosition(canvasGamer);
    //  var width = calculateWidth(canvasArray, dim);
    console.log(dim);
    for (var i = 0; i < dim; i++) {
      for (var j = 0; j < dim; j++) {

        var index = { i: i, j: j };
        startPnt = { x: j * width, y: i * width };
        var element = new Element(index, startPnt, width, 0, style.strokeStyle, style.fillStyle);
        console.log(element);
        element.draw(ctx);
        if (i < dim && j < dim) {
          canvasArray.push(element);
        }
      }
    }
    return canvasArray;
  },

  findIndexOfElement: function(startPnt,array) {
    console.log('array---')
    for(var i=0; i<array.length; i++) {

        var element = array[i];
        console.log(array[i])
        if(element.contains(startPnt)){
          var index = element.index;
          return index;
        }
     }
    return null;
  },

  findHeroByPoint: function(startPnt, herosArray) {
    console.log('array---')
    for(var i=0; i<herosArray.length; i++) {

        var element = herosArray[i].position;
        if(element.contains(startPnt)){
          return herosArray[i];
        }
     }
    return null;
  },

  findCellByIndex: function (startIndex, array) {

    for (var i = 0; i < array.length; i++) {

      if (array[i].index.i == startIndex.i && array[i].index.j == startIndex.j) {
        return array[i];
      }
    }
    return null;
  },

  DrawImg: function (ctx, startIndex, array, img, padding) {

    var elem = this.findCellByIndex(startIndex, array);
    elem.addImg(ctx, img, padding);
    array.push(elem);
  },

  redrawCanvas: function (ctx, canvas, gamerHeros, gamerFreeCellCollection, computerHeros, arrayCopy, padding) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //fillCanvas(gamerCtx, enemyCtx, style);
    for (var i = 0; i < arrayCopy.length; i++) {

      var el = arrayCopy[i];
      el.draw(ctx);
    }
    if(gamerFreeCellCollection && gamerFreeCellCollection.length>0) {
      for (var i = 0; i < gamerFreeCellCollection.length; i++) {

        var el = gamerFreeCellCollection[i];
        el.draw(ctx);
      }
    }
    if (gamerHeros.length > 0) {
      for (var i = 0; i < gamerHeros.length; i++) {
        gamerHeros[i].drawAvatar(ctx, padding);
      }
    }
    if (computerHeros.length > 0) {
      for (var i = 0; i < computerHeros.length; i++) {
        computerHeros[i].drawAvatar(ctx, padding);
      }
    }

  },

  checkLeftUp: function(currentIndex, i, j, freeCellCollection, canvasArray,gamerHeros, computerHeros, canvas, ctx, padding){

    var dxj = (-1)*j;
    var dyi = (-1)*i;

    if((currentIndex.i+ dyi) <0) return;
    if((currentIndex.j+ dxj) <0) return;
    var index = {i: currentIndex.i+ dyi, j: currentIndex.j+ dxj};
    return this.markFreeCell(index, freeCellCollection, canvasArray, gamerHeros, computerHeros, canvas, ctx, padding);
  },

  checkRightUp: function(currentIndex, i, j, freeCellCollection, canvasArray,gamerHeros, computerHeros, canvas, ctx, padding){

    var dxj = j;
    var dyi = (-1)*i;

    if((currentIndex.i+ dyi) < 0) return;
    if((currentIndex.j+ dxj) > 8) return;
    var index = {i: currentIndex.i+ dyi, j: currentIndex.j+ dxj};
    return this.markFreeCell(index, freeCellCollection, canvasArray, gamerHeros, computerHeros, canvas, ctx, padding);

  },
  checkLeftDown: function(currentIndex, i, j, freeCellCollection, canvasArray,gamerHeros, computerHeros, canvas, ctx, padding){

    var dxj = (-1)*j;
    var dyi = i;

    if((currentIndex.i+ dyi) > 8) return;
    if((currentIndex.j+ dxj) < 0) return;
    var index = {i: currentIndex.i+ dyi, j: currentIndex.j+ dxj};
    return this.markFreeCell(index, freeCellCollection, canvasArray, gamerHeros, computerHeros, canvas, ctx, padding);

  },
  checkRightDown: function(currentIndex, i, j, freeCellCollection, canvasArray,gamerHeros, computerHeros, canvas, ctx, padding){

    var dxj = j;
    var dyi = i;

    if((currentIndex.i+ dyi) > 8 ) return;
    if((currentIndex.j+ dxj) > 8 ) return;
    var index = {i: currentIndex.i+ dyi, j: currentIndex.j+ dxj};
    return this.markFreeCell(index, freeCellCollection, canvasArray, gamerHeros, computerHeros, canvas, ctx, padding);

  },
  markFreeCell: function(index, freeCellCollection, canvasArray, gamerHeros, computerHeros, canvas, ctx, padding) {

    //this.redrawCanvas(ctx, canvas, gamerHeros, freeCellCollection, computerHeros, canvasArray, padding)
    var el = this.findCellByIndex(index, canvasArray);
    if (el.state == 0) {
      var fillStyle = "#f7f5cd";
    //  var strokeStyle = 'black';
      console.log('el')
      console.log(el);
      el.setFill(fillStyle);
      el.fillRect(ctx);
      freeCellCollection.push(el);
      freeCellCollection.map(function(item){
        item.fillRect(ctx);
      });
      console.log(freeCellCollection)
      return false;
    }
    else {
      return true;// this means that search of free cells must stop
    }
    // this means that search of free cells must continue
    //this.redrawCanvas(ctx, canvas, gamerHeros, freeCellCollection, computerHeros, canvasArray, padding)
  }
};

export default fm;
