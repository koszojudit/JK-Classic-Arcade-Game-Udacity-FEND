

// Draw Enemies and the Player onto the screen
// Replaces separate render() methods for player and enamy classes

Object.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// --- ENEMY CLASS --- //
// Enemies our player must avoid

var Enemy = function(x, y) {
  // The image/sprite for our enemies, this uses (helper method provided to easily load images)
  this.sprite = 'images/enemy-bug.png';

  // Variables applied to each of our instances
  this.x = x;
  this.y = y;
  this.velocity = 100 + Math.floor(Math.random() * 150);
};

// Update the enemy's position (loop when off canvas)
// Multiply any movement by the dt parameter (time delta between ticks), this ensures the game runs at the same speed for all computers.

Enemy.prototype.update = function(dt) {
  this.x = this.x + this.velocity * dt;
  this.collide(player);
  if (this.x > 1500) {
    this.x = -200;
  }
};

Enemy.prototype.collide = function(player) {
  let enemyRow = Math.floor(this.y/100);
  let playerRow = Math.floor(player.y/100);
  if (Math.abs(player.x - this.x) < 80 && Math.abs(player.y - this.y) < 30) {
  // if ((player.left < this.right || player.right > this.left) && enemyRow === playerRow) {
  // if (this.right() > player.left() && this.left() < player.right() && player.row === this.row) {
    player.reset();
  }
};

// Return this enemy's left value for collision detection
Enemy.prototype.left = function() {
  var left = this.x;
  return left;
}

// Return this enemy's right value for collision detection
Enemy.prototype.right = function() {
  var right = this.x + 100;
  return right;
}

// --- PLAYER CLASS --- //

// Player with image and location

var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};

// Moves the player object in the direction of the arrow key clicked
Player.prototype.handleInput = function (userInput) {

  switch (userInput) {
        case 'left':
            if (player.x >= 50) {
                player.x -= 100;
            }
            break;
        case 'right':
            if (player.x <= 300) {
                player.x += 100;
            }
            break;
        case 'up':
            if (player.y > 60) {
                player.y -= 80;
            } else {
                // player.score += 100;
                player.y = 380;
                player.x = 200;
            }

            break;
        case 'down':
            if (this.y <= 300) {
                this.y += 80;
            }

            break;

    }
};

// Update method for player
Player.prototype.update = function () {
};

// Reset Player to start position when reaching water or colliding with enemy
Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
};

// Return the player's left value for collision detection
Player.prototype.left = function() {
  var left = this.x + 35;
  return left;
}

// Return the player's right value for collision detection
Player.prototype.right = function() {
  var right = this.x + 70;
  return right;
}

// --- INSTANTIATE --- //

// Player object is in a variable called player
var player = new Player();

// All enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++){
  setTimeout(function(){
    allEnemies.push(new Enemy(-200, 60));
  }, 500);
  setTimeout(function() {
    allEnemies.push(new Enemy(-250, 150));
  }, 1500);
  setTimeout(function() {
    allEnemies.push(new Enemy(-300, 230));
  }, 2500);
}

// --- HELPER METHODS --- //

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
