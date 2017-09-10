var Hero = function (type, force, armor, blood, attackDistance, speed, position, avatar, isEnemy) {

  this.type = type;
  this.avatar = avatar;
  this.force = force;
  this.armor = armor;
  this.blood = blood;
  this.attackDistance = attackDistance;
  this.speed = speed;
  this.position = position; //canvas cell from cellCollection
  this.result = 0;
  this.isEnemy = isEnemy;
  this.freeCellColletion = [];

    this.setResult = function (result) {
      this.result += result;
    },
    this.setBlood = function (result) {
      this.blood = blood;
    },
    this.setPosition = function (position) {
      this.position = position;
    },
    this.setFreeCellCollection = function (cellCollection) {
      this.freeCellCollection = cellCollection;
    },
    this.emptyFreeCellCollection = function () {
      this.freeCellCollection.splice(0);
    },
    this.move = function (direction, index, canvasArray) {

    },

    this.drawAvatar = function (ctx, padding) {

      this.fillRect(ctx);
      var position = this.position;
      var image = new Image();
      image.src = this.avatar;
      image.onload = function () {
        ctx.drawImage(image, position.startPoint.x + padding, position.startPoint.y + padding, position.width - padding, position.width - padding);
      }
    },

    this.fillRect = function (ctx) {

      var position = this.position;
      var fillStyle = '#bac374';
      if (this.isEnemy) {
        fillStyle = 'lightblue';
      }
      ctx.fillStyle = fillStyle;
      ctx.fillRect(position.startPoint.x, position.startPoint.y, position.width, position.width);
    },


    this.shoot = function (enemy, enemyArray) {

      var sum = randomSum();
      var result = 0;
      if ((Math.abs(enemy.position.index.i - this.position.index.i) > this.attackDistance) ||
        (Math.abs(enemy.position.index.j - this.position.index.j) > this.attackDistance) ||
        (enemy.isEnemy == false))
        return 0;
      else if (sum == enemy.blood)
        return 0;
      else if (sum == 3) {
        result = enemy.blood - Math.floor((this.force - enemy.armor) / 2)
        this.setResult(result);
        enemy.setBlood(enemy.blood - result);
      }
      else {
        result = enemy.blood - Math.floor((this.force - enemy.armor))
        this.setResult(result);
        enemy.setBlood(enemy.blood - result);

      }
    }
}

//help functions
function getRandomizer(bottom, top) {
  return function () {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  }
};
//this is a function to be called
var randomNumber = getRandomizer(1, 6);

function randomSum() {

  var sum = 0;
  for (var i = 0; i < 3; i++) {
    sum += randomNumber();
  }
  return sum;
};

export default Hero;
