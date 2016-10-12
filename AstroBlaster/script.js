var turnRight = false;
var turnRight2 = false;
var turnLeft = false;
var turnLeft2 = false;
var thrust = false;
var thrust2 = false;
var degrees = 0;
var degrees2 = 0;
var x = 0;
var y = 0;
var x02 = 0;
var y02 = 0;
var dx = 0;
var dy = -1;
var dx2 = 0;
var dy2 = -1;
var xspeed = 0;
var yspeed = 0;
var xspeed2 = 0;
var yspeed2 = 0;
var shoot = false;
var shoot2 = false;
var shotspeed = 0;
var shotspeed2 = 0;
var bulletdx = [];
var bulletdy = [];
var bulletd = [];
var h = $(window).height();
var w = $(window).width();
var asteroiddx = [1.4, 0.5];
var asteroiddy = [1, 2];
$("body").append("<div class='asteroid'></div>")
$("body").append("<div class='asteroid'></div>")
$(".asteroid").eq(0).css("top", 50);
$(".asteroid").eq(1).css("top", 100);
$(".asteroid").eq(0).css("left", 145);
$(".asteroid").eq(1).css("left", 203);
$("body").append("<div id='spaceship2'></div>")
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
  if (e.which == 32) {
    shoot = true;
  }
  if (e.which == 82) {
    shoot2 = true;
  }
})
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
  if (e.which == 32) {
    shoot = false;
  }
  if (e.which == 82) {
    shoot2 = false;
  }
})
var game = setInterval(function() {
  if ($("#spaceship").length > 0 && $("#spaceship2").length > 0) {
    var cap = 2;
  } else if ($("#spaceship").length > 0 || $("#spaceship2").length > 0){
    var cap = 1;
  }
  else {
    var cap = 0;
  }
  for (var j = 0; j < $(".asteroid").length; j++) {
    for (var i = 0; i < $(".bullet").length + cap; i++) {
      if ($(".bullet").length == i && $("#spaceship").length > 0) {
        newtop = parseInt($("#spaceship").position().top) + Math.sin(90) * parseInt(50);
        var r2 = 20;
        var x2 = $("#spaceship").position().left + r2;
        var y2 = newtop - 20;
      }
      else if ($(".bullet").length + cap - 1 == i && $("#spaceship2").length > 0) {
        newtop = parseInt($("#spaceship2").position().top) + Math.sin(90) * parseInt(50);
        var r2 = 20;
        var x2 = $("#spaceship2").position().left + r2;
        var y2 = newtop - 20;
      }
      else{
        var x2 = $(".bullet").eq(i).position().left
        var y2 = $(".bullet").eq(i).position().top
        var r2 = 2.5;
      }
      var r1 = $(".asteroid").eq(j).width() / 2;
      var x1 = $(".asteroid").eq(j).position().left + r1
      var y1 = $(".asteroid").eq(j).position().top + r1
      if ((x2-x1)**2 + (y1-y2)**2 <= (r1+r2)**2 && ($(".bullet").length != i && $(".bullet").length + 1 != i)) {
        var other = $(".asteroid").eq(j).position().top;
        var left = $(".asteroid").eq(j).position().left;
        $(".asteroid").eq(j).remove();
        $(".bullet").eq(i).remove();
        bulletdx.splice(i, 1);
        bulletdy.splice(i, 1);
        bulletd.splice(i, 1);
        asteroiddx.splice(j, 1);
        asteroiddy.splice(j, 1);
        if (r1 >= 25) {
          $("body").append("<div class='asteroid'></div>")
          $("body").append("<div class='asteroid'></div>")
          $(".asteroid").eq($(".asteroid").length - 1).css("width", r1)
          $(".asteroid").eq($(".asteroid").length - 1).css("height", r1)
          $(".asteroid").eq($(".asteroid").length - 2).css("height", r1)
          $(".asteroid").eq($(".asteroid").length - 2).css("width", r1)
          $(".asteroid").eq($(".asteroid").length - 1).css("top", other)
          $(".asteroid").eq($(".asteroid").length - 1).css("left", left)
          $(".asteroid").eq($(".asteroid").length - 2).css("left", left)
          $(".asteroid").eq($(".asteroid").length - 2).css("top", other)
          asteroiddx.push(Math.floor(Math.random() * 4));
          asteroiddy.push(Math.floor(Math.random() * 4));
          asteroiddx.push(Math.floor(Math.random() * 4));
          asteroiddy.push(Math.floor(Math.random() * 4))
        }
      }
      else if ((x2-x1)**2 + (y1-y2)**2 <= (r1+r2)**2 && $(".bullet").length == i && $("#spaceship").length > 0){
        $("#spaceship").remove();
      }
      else if ((x2-x1)**2 + (y1-y2)**2 <= (r1+r2)**2 && $(".bullet").length + cap - 1 == i){
        $("#spaceship2").remove();
      }
    }
  }
  for (var i = 0; i < $(".asteroid").length; i++) {
    if ($(".asteroid").eq(i).position().left + ($(".asteroid").eq(i).width() / 2) > w) {
      $(".asteroid").eq(i).css("left", ($(".asteroid").eq(i).width() / 2) * -1);
    }
    if ($(".asteroid").eq(i).position().top + ($(".asteroid").eq(i).width() / 2) < 0) {
      $(".asteroid").eq(i).css("top", h + ($(".asteroid").eq(i).width() / 2));
    }
    if ($(".asteroid").eq(i).position().top + ($(".asteroid").eq(i).width() / 2) > h) {
      $(".asteroid").eq(i).css("top", -1 * ($(".asteroid").eq(i).width() / 2));
    }
    if ($(".asteroid").eq(i).left + ($(".asteroid").eq(i).width() / 2) < 0) {
      $(".asteroid").eq(i).css("left", w + ($(".asteroid").eq(i).width() / 2));
    }
    $(".asteroid").eq(i).css("left", $(".asteroid").eq(i).position().left + asteroiddx[i]);
    $(".asteroid").eq(i).css("top", $(".asteroid").eq(i).position().top + asteroiddy[i]);
  }

  if ((shoot || shoot2) && (shotspeed > 50 || shotspeed2 > 50)) {
    if (shoot && shotspeed > 50) {
      var getTop = x;
      var getBottom = y;
      var getSpeedx = dx;
      var getSpeedy = dy;
    } else if (shoot2 && shotspeed2 > 50){
      var getTop = x02;
      var getBottom = y02;
      var getSpeedx = dx2;
      var getSpeedy = dy2;
    }
    if (getTop != undefined) {
      var $bullet = "<div class='bullet'></div>"
      $("body").append($bullet);
      $(".bullet").eq(bulletdx.length).css("left", getTop + 20);
      $(".bullet").eq(bulletdx.length).css("top", getBottom + 20);
      bulletdx.push(getSpeedx);
      bulletdy.push(getSpeedy);
      if (shoot) {
        bulletd.push(1);
      } else {
        bulletd.push(1)
      }
      if (shotspeed > 50 && shoot) {
        shotspeed = 0;
      } else{
        shotspeed2 = 0;
      }
    }
  }
  if (bulletdx.length > 0) {
    for (var i = 0; i < bulletdx.length; i++) {
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
        $bullet.css("top", $bullet.position().top + (bulletdy[i] * 5));
        $bullet.css("left", $bullet.position().left + (bulletdx[i] * 5));
      } else {
        $bullet.remove();
        bulletdx.splice(i, 1);
        bulletdy.splice(i, 1);
        bulletd.splice(i, 1);
      }
    }
  }
  shotspeed += 1;
  shotspeed2 += 1;
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
  if (turnLeft2) {
    degrees2 -= 2;
    if (degrees2 <= 90) {
      dx2 -= 2/90;
      dy2 -= 2/90;
    }
    if (degrees2 > 90 && degrees2 <= 180) {
      dx2 += 2/90;
      dy2 -= 2/90
    }
    if (degrees2 > 180 && degrees2 <= 270) {
      dx2 += 2/90;
      dy2 += 2/90
    }
    if (degrees2 > 270) {
      dx2 -= 2/90;
      dy2 += 2/90
    }
    if (degrees2 <= -1) {
      dx2 = -1/90;
      dy2 = -1 + (-1/90)
      degrees2 = 359;
    }
    $("#spaceship2").css("transform", "rotate(" + degrees2 + "deg)")
  }
  if (turnRight2) {
    degrees2 += 2;
    if (degrees2 <= 90) {
      dx2 += 2/90;
      dy2 += 2/90;
    }
    if (degrees2 > 90 && degrees2 <= 180) {
      dx2 -= 2/90;
      dy2 += 2/90
    }
    if (degrees2 > 180 && degrees2 <= 270) {
      dx2 -= 2/90;
      dy2 -= 2/90
    }
    if (degrees2 > 270) {
      dx2 += 2/90;
      dy2 -= 2/90
    }
    if (degrees2 >= 360) {
      degrees2 = 0;
      dx2 = 0;
      dy2 = -1;
    }
    $("#spaceship2").css("transform", "rotate(" + degrees2 + "deg)")
  }
  if (thrust) {
    xspeed += dx;
    yspeed += dy;
  }
  if (thrust2) {
    xspeed2 += dx2;
    yspeed2 += dy2;
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
  x += xspeed * 0.03;
  y += yspeed * 0.03;
  $("#spaceship").css("left", x);
  $("#spaceship").css("top", y);
  x02 += xspeed2 * 0.03;
  y02 += yspeed2 * 0.03;
  $("#spaceship2").css("left", x02);
  $("#spaceship2").css("top", y02);
}, 10)
