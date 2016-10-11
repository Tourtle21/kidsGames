var turnRight = false;
var turnLeft = false;
var thrust = false;
var degrees = 0;
var x = 0;
var y = 0;
var dx = 0;
var dy = -1;
var xspeed = 0;
var yspeed = 0;
var shoot = false;
var shotspeed = 0;
var bulletx = [];
var bullety = [];
var bulletd = [];
var h = $(window).height();
var w = $(window).width();
document.addEventListener("keydown", function(e){
  if (e.which == 39) {
    turnRight = true;
  }
  if (e.which == 37) {
    turnLeft = true;
  }
  if (e.which == 38) {
    $("#spaceship").css("background-position", "-40px 0")
    thrust = true;
  }
  if (e.which == 32) {
    shoot = true;
  }
})
document.addEventListener("keyup", function(e) {
  if (e.which == 39) {
    turnRight = false;
  }
  if (e.which == 37) {
    turnLeft = false;
  }
  if (e.which == 38) {
    $("#spaceship").css("background-position", "0 0")
    thrust = false;
  }
  if (e.which == 32) {
    shoot = false;
  }
})
setInterval(function() {
  if (shoot && shotspeed > 50) {
    var $bullet = "<div class='bullet'></div>"
    $("body").append($bullet);
    $(".bullet").eq(bulletx.length).css("left", x + 20);
    $(".bullet").eq(bulletx.length).css("top", y + 20);
    bulletx.push(dx);
    bullety.push(dy);
    bulletd.push(1);
    shotspeed = 0;
  }
  if (bulletx.length > 0) {
    for (var i = 0; i < bulletx.length; i++) {
      var $bullet = $(".bullet").eq(i);
      if ($bullet.position().left > w) {
        $bullet.css("left", 0);
      }
      if ($bullet.position().top < 0) {
        $bullet.css("top", h);
      }
      if ($bullet.position().top > h) {
        $bullet.css("top", 0);
      }
      if ($bullet.position().left < 0) {
        $bullet.css("left", w);
      }
      bulletd[i] += 1;
      if (bulletd[i] < 100) {
        $bullet.css("top", $bullet.position().top + (bullety[i] * 5));
        $bullet.css("left", $bullet.position().left + (bulletx[i] * 5));
      } else {
        $bullet.remove();
        bulletx.splice(i, 1);
        bullety.splice(i, 1);
        bulletd.splice(i, 1);
      }
    }
  }
  shotspeed += 1;
  if (turnRight) {
    degrees += 2;
    if (degrees <= 90) {
      dx += 2/90;
      dy += 2/90;
    }
    if (degrees > 90 && degrees <= 180) {
      dx -= 2/90;
      dy += 2/90
    }
    if (degrees > 180 && degrees <= 270) {
      dx -= 2/90;
      dy -= 2/90
    }
    if (degrees > 270) {
      dx += 2/90;
      dy -= 2/90
    }
    if (degrees >= 360) {
      degrees = 0;
      dx = 0;
      dy = -1;
    }
    $("#spaceship").css("transform", "rotate(" + degrees + "deg)")
  }
  if (turnLeft) {
    degrees -= 2;
    if (degrees <= 90) {
      dx -= 2/90;
      dy -= 2/90;
    }
    if (degrees > 90 && degrees <= 180) {
      dx += 2/90;
      dy -= 2/90
    }
    if (degrees > 180 && degrees <= 270) {
      dx += 2/90;
      dy += 2/90
    }
    if (degrees > 270) {
      dx -= 2/90;
      dy += 2/90
    }
    if (degrees <= -1) {
      dx = -1/90;
      dy = -1 + (-1/90)
      degrees = 359;
    }
    $("#spaceship").css("transform", "rotate(" + degrees + "deg)")
  }
  if (thrust) {
    xspeed += dx;
    yspeed += dy;
  }
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
  x += xspeed * 0.03;
  y += yspeed * 0.03;
  $("#spaceship").css("left", x);
  $("#spaceship").css("top", y);
}, 10)
