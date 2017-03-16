var moveLeft = false;
var moveRight = false;
var jump = false;
var speed = 4;
var fallingSpeed = 0;
var falling = true;
var jumping = false;
var terminal = 10;
var touching = false;
character = document.getElementById("character");
character.style.left = 0;
character.style.top = 0;
character.style.width = "10px";
character.style.height = "10px";

document.getElementsByClassName("platform")[0].style.top = window.innerHeight - 100 + "px";
document.getElementsByClassName("platform")[0].style.left = "400px";
document.getElementsByClassName("platform")[0].style.width = "100px";
document.getElementsByClassName("platform")[0].style.height = "50px";
document.getElementsByClassName("terminal")[0].style.height = "10px";
document.getElementsByClassName("terminal")[0].style.width = "10px";
document.getElementsByClassName("terminal")[0].style.background = "black";
document.getElementsByClassName("terminal")[0].style.position = "absolute";
document.getElementsByClassName("terminal")[0].style.top = window.innerHeight - 10 + "px";
document.getElementsByClassName("terminal")[0].style.left = "8px"
document.addEventListener("keydown", function(e) {
    if (e.which == 68) {
        moveRight = true;
    }
    if (e.which == 65) {
        moveLeft = true;
    }
    if (e.which == 87) {
        jump = true;
    }
})
document.addEventListener("keyup", function(e) {
    if (e.which == 68) {
        moveRight = false;
    }
    if (e.which == 65) {
        moveLeft = false;
    }
    if (e.which == 87) {
        jump = false;
    }
})
movecharacter = function() {
    left = parseInt(character.style.left.slice(0, -2));
    posTop = parseInt(character.style.top.slice(0, -2));
    newLeft = left;
    newTop = posTop;
    if (moveRight) {
        newLeft = left + speed;
    }
    if (moveLeft) {
        newLeft = left - speed;
    }
    if (falling) {
        if (fallingSpeed <= terminal) {
            fallingSpeed += 0.2;
        }
        newTop = newTop + fallingSpeed;
    }
    if (newTop >= window.innerHeight - 10) {
        newTop = window.innerHeight - 10;
        falling = false;
        fallingSpeed = 0;
    }
    if ((fallingSpeed == 0) && jump) {
        fallingSpeed = -terminal;
        jumping = true;
        falling = false;
    }
    if (jumping) {
        touching = false;
        fallingSpeed += 0.4;
        newTop = newTop + fallingSpeed;
        if (fallingSpeed >= terminal) {
            jumping = false;
            falling = true;
        }
    }
    var count = 0;
    if (touching && !wallcollision(newLeft, newTop + 1)) {
      falling = true;
      touching = false;
    }

    if (left - newLeft != 0) {
      coordinates = wallcollision(newLeft, posTop)
      if (coordinates) {
        count += 1;
        if (left - newLeft > 0) {
          character.style.left = coordinates[3] + "px";
        }
        if (left - newLeft < 0){
          character.style.left = coordinates[2] - 10 + "px";
        }
        character.style.top = newTop + "px"
      }
    }
    if (posTop - newTop != 0) {
      coordinates = wallcollision(left, newTop)
      if (coordinates) {
        count += 1;
        if (posTop - newTop > 0) {
          character.style.top = coordinates[1] + "px";
          fallingSpeed = -fallingSpeed
        }
        if (posTop - newTop < 0) {
          character.style.top = coordinates[0] - 10 + "px";
          fallingSpeed = 0;
          jumping = false;
          falling = false;
          touching = true;
        }
        character.style.left = newLeft + "px"
      }
    }
    if (count == 0){
      character.style.top = newTop + "px";
      character.style.left = newLeft + "px";
    }
}

parsePos = function(raw) {
    return parseInt(raw.slice(0, -2))
}

platform = function(width, height, x, y) {
    self.width = width;
    self.height = height;
    self.x = x;
    self.y = y;

}

wallcollision = function(left, posTop) {
    right = parseInt(left + parseInt(character.style.width.slice(0, -2)));
    bottom = parseInt(posTop + parseInt(character.style.height.slice(0, -2)));
    platforms = document.getElementsByClassName("platform");
    for (var i = 0; i < platforms.length; i++) {
        pposTop = parseInt(platforms[i].style.top.slice(0, -2));
        pleft = parseInt(platforms[i].style.left.slice(0, -2));
        pright = parseInt(platforms[i].style.left.slice(0, -2)) + parseInt(platforms[i].style.width.slice(0, -2));
        pbottom = parseInt(platforms[i].style.top.slice(0, -2)) + parseInt(platforms[i].style.height.slice(0, -2));
        if (posTop < pbottom && left < pright && right > pleft && bottom > pposTop) {
          return [pposTop, pbottom, pleft, pright]
        }
    }
}
function followerMove() {
    followers = document.getElementsByClassName("follower");
    amount = followers.length;
    for (i = 0; i < amount; i++) {
        if (parsePos(followers[i].style.left) > parsePos(character.style.left)) {
            followers[i].style.left = parsePos(followers[i].style.left) - 2 + "px"
        } else {
            followers[i].style.left = parsePos(followers[i].style.left) + 2 + "px"
        }
    }
}

function enemycollision() {
    posTop = parseInt(character.style.top.slice(0, -2));
    left = parseInt(character.style.left.slice(0, -2));
    right = parseInt(character.style.left.slice(0, -2)) + parseInt(character.style.width.slice(0, -2));
    bottom = parseInt(character.style.top.slice(0, -2)) + parseInt(character.style.height.slice(0, -2));


    enemies = document.getElementsByClassName("enemy");
    for (var i = 0; i < enemies.length; i++) {
        pposTop = parseInt(enemies[i].style.top.slice(0, -2));
        pleft = parseInt(enemies[i].style.left.slice(0, -2));
        pright = parseInt(enemies[i].style.left.slice(0, -2)) + parseInt(enemies[i].style.width.slice(0, -2));
        pbottom = parseInt(enemies[i].style.top.slice(0, -2)) + parseInt(enemies[i].style.height.slice(0, -2));
        if (posTop <= pbottom && left <= pright && right >= pleft && bottom >= pposTop) {
            document.location.reload();
        }
    }
}

function terminalcollision() {
    posTop = parseInt(character.style.top.slice(0, -2));
    left = parseInt(character.style.left.slice(0, -2));
    right = parseInt(character.style.left.slice(0, -2)) + parseInt(character.style.width.slice(0, -2));
    bottom = parseInt(character.style.top.slice(0, -2)) + parseInt(character.style.height.slice(0, -2));


    terminals = document.getElementsByClassName("terminal");
    for (var i = 0; i < terminals.length; i++) {
        pposTop = parseInt(terminals[i].style.top.slice(0, -2));
        pleft = parseInt(terminals[i].style.left.slice(0, -2));
        pright = parseInt(terminals[i].style.left.slice(0, -2)) + parseInt(terminals[i].style.width.slice(0, -2));
        pbottom = parseInt(terminals[i].style.top.slice(0, -2)) + parseInt(terminals[i].style.height.slice(0, -2));
        if (posTop <= pbottom && left <= pright && right >= pleft && bottom >= pposTop) {
            console.log("HIT TERMINAL")
        }
    }
}
setInterval(function() {

    movecharacter();
    terminalcollision();
    followerMove();
    enemycollision();

}, 1000 / 90)
