// Variables for checking if the specific keys are pressed
var turnRight = false;
var turnRight2 = false;
var turnLeft = false;
var turnLeft2 = false;
var thrust = false;
var thrust2 = false;
var shoot = false;
var shoot2 = false;

// The amount of degrees the spaceship is turning
var degrees = 0;
var degrees2 = 0;

// Position of the spaceships
var x = 0;
var y = 0;
var x02 = 0;
var y02 = 0;

// Speed of the spaceShips
var dx = 0;
var dy = -1;
var dx2 = 0;
var dy2 = -1;
var xspeed = 0;
var yspeed = 0;
var xspeed2 = 0;
var yspeed2 = 0;

// Speed of the bullets
var shotspeed = 0;
var shotspeed2 = 0;
var bulletdx = [];
var bulletdy = [];
var bulletd = [];

// Keeps track of the score
var score = 0;

// the height and width of the document
var h = $(window).height();
var w = $(window).width();

// An array of speeds for the asteroids
var asteroiddx = [1.4, 0.5];
var asteroiddy = [1, 2];

// Booleans that tell if the players are dead or not
var player1Dead = false;
var player2Dead = false;

// Appends the first two asteroids to the screen and spaceship2
$("body").append("<div class='asteroid'></div>")
$("body").append("<div class='asteroid'></div>")
$(".asteroid").eq(0).css("top", 50);
$(".asteroid").eq(1).css("top", 100);
$(".asteroid").eq(0).css("left", 145);
$(".asteroid").eq(1).css("left", 203);
$("body").append("<div id='spaceship2'></div>")

//checks for when the key is down and sets all of the booleans to true
document.addEventListener("keydown", function(e){
  if (e.which == 39) {
    turnRight = true;
  }
  if (e.which == 68) {
    turnRight2 = true;
  }
  if (e.which == 37) {
    turnLeft = true;
  }
  if (e.which == 65) {
    turnLeft2 = true;
  }
  if (e.which == 38) {
    $("#spaceship").css("background-position", "-40px 0")
    thrust = true;
  }
  if (e.which == 87) {
    $("#spaceship2").css("background-position", "-40px 0")
    thrust2 = true;
  }
  if (e.which == 32 && !player1Dead) {
    shoot = true;
  }
  if (e.which == 82 && !player2Dead) {
    shoot2 = true;
  }
})

// checks for when the key goes back up and sets all of the booleans to false
document.addEventListener("keyup", function(e) {
  if (e.which == 65) {
    turnLeft2 = false;
  }
  if (e.which == 39) {
    turnRight = false;
  }
  if (e.which == 68) {
    turnRight2 = false;
  }
  if (e.which == 37) {
    turnLeft = false;
  }
  if (e.which == 38) {
    $("#spaceship").css("background-position", "0 0")
    thrust = false;
  }
  if (e.which == 87) {
    thrust2 = false;
    $("#spaceship2").css("background-position", "0 0")
  }
  if (e.which == 32 && !player1Dead) {
    if (!player1Dead) {
      shoot = false;
    }
  }
  if (e.which == 82 && !player2Dead) {
    shoot2 = false;
  }
})

//Sets the infinte loop interval to run the game
var game = setInterval(function() {
  //This simple if statement checks for if the game is over and displays a button
  if (player2Dead && player1Dead) {
    $("#restart").text("YOU LOSE:( Restart")
    $("#restart").css("visibility", "visible")
  }
  //Says you win if there are no more asteroids
  if ($(".asteroid").length == 0) {
    $("#restart").text("YOU WIN! Retry")
    $("#restart").css("visibility", "visible")
  }
  //This checks to see how manyspaceships are still in the game to run all of the other functions

  // For loop for moving the asteroids

  //Shoots the bullets

    //appends the new bullets

  //checks if the right key is pressed and rotates the spaceship and changes the speed to match the degrees
  
  //Checks if thrust is pressed and gives dx and dy more speed
  if (thrust) {
    xspeed += dx;
    yspeed += dy;
  }
  if (thrust2) {
    xspeed2 += dx2;
    yspeed2 += dy2;
  }
  //Checks if spaceship1 is off screen and places it on the opposite side.
  if (x > w - 17.5) {
    x = -17.5;
  }
  if (y < -17.5) {
    y = h - 17.5
  }
  if (y > h + 17.5) {
    y = -17.5;
  }
  if (x < -17.5) {
    x = w - 17.5
  }
  //checks if spaceship2 is off screen and places it on the opposite side.
  if (x02 > w - 17.5) {
    x02 = -17.5;
  }
  if (y02 < -17.5) {
    y02 = h - 17.5
  }
  if (y02 > h + 17.5) {
    y02 = -17.5;
  }
  if (x02 < -17.5) {
    x02 = w - 17.5
  }
  //moves the spaceships
  x += xspeed * 0.03;
  y += yspeed * 0.03;
  $("#spaceship").css("left", x);
  $("#spaceship").css("top", y);
  x02 += xspeed2 * 0.03;
  y02 += yspeed2 * 0.03;
  $("#spaceship2").css("left", x02);
  $("#spaceship2").css("top", y02);
}, 10)
//reloads the page if the restart button is clicked
function reload() {
  location.reload();
}
