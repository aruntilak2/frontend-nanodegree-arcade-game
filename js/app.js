// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
  
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x=0;
    this.y=55;
    this.step =101;
    this.jump=83;
    this.speed=75;
  
  };
  
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {  
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // let speed;
    // let distance = speed*dt;
    if (this.x >= -101 && this.x <= 505) {
      this.x+=((this.speed)*dt)*2;  
      if (this.y>=55 && this.y <=83){
        this.x+=((this.speed*dt)*3);
      }
      if (this.y> 83 && this.y <=138){
        this.x+=((this.speed*dt)*2);
      }
      if (this.y> 138 && this.y <=221){
        this.x+=((this.speed*dt)*1);
      }
      if (this.y> 202 && this.y <=304){
        this.x+=200*dt;
      }
      
    }
    else {
      this.x=-101;
    }
    
  };
  
  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  // Enemy.prototype.handleInput = function(dt) {
  // };
  
  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  
  const Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 0;
    this.y = 0;
    this.step=101;
    this.jump=83;
    this.startX= this.step*2;
    this.startY=(this.jump*4)+55;
    this.x=this.startX;
    this.y=this.startY;
    

  };
  Player.prototype.update = function(dt) {
    for (let enemy of allEnemies){
      if (this.y=== enemy.y && (enemy.x+enemy.step/2> this.x&& enemy.x<this.x+this.step/2)){
        // alert("Collide")
        this.reset();
      }
    }
    if (this.y === 55){
      alert("Congrats");
    }
    // win.requestAnimationFrame(main);
  }
  Player.prototype.reset = function (){
    this.x=this.startX;
    this.y=this.startY;
    }
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  Player.prototype.handleInput = function(direction) {
  
    if (this.x >= 0 && this.x <= 505) {
      if (direction == "left" && this.x >= -101) {
        this.x -= 101;
        if (this.x < 100) {
          this.x = 0;
        }
      } else if (direction == "right" && this.x <= 505) {
        this.x += 101;
        if (this.x > 404) {
          this.x = 404;
        }
      } else if (direction == "up" && this.y >= -101) {
        this.y -=83 ;
        if (this.y < -60) {
          this.y = -60;
        }
      } else {
        this.y += 83;
        if (this.y > 440) {
          this.y = 440;
        }
      }
    }
  };
  
  // Now instantiate your objects.
  let enemy1 = new Enemy();
  enemy1.y = 55;
  let enemy2 = new Enemy();
  enemy2.y = 55+83;
  let enemy3 = new Enemy();
  enemy3.y = 55+166;
  
  // Place all enemy objects in an array called allEnemies
  let allEnemies =[];
  allEnemies.push(enemy1, enemy2,enemy3);
  // Place the player object in a variable called player
  var player = new Player();
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener("keyup", function(e) {
    var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  
    // Player.handleInput(allowedKeys[e.keyCode]);
    if (allowedKeys[e.keyCode]) {
      player.handleInput(allowedKeys[e.keyCode]);
    }
    //   });
  });
  