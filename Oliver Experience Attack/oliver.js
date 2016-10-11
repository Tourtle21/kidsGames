
$("#game").append("<progress id='power' value='0' max='100'></progress>")
var damage = 25;
var frozen = -1;
var freezeCount = 0;
var rockColor = "black";
var cloudSpeed = 1;
var store = 1;
var lightningBolts = 1;
var money = 0;
var increase = 1
var size = 10;
var shoot = false;
var power = 0;
var spot;
var shooting;
var w = window.innerWidth;
var h = window.innerHeight;
var x;
var y;
var shootbool = false;
var ncounter = 0;
var scounter = 0;
var bcounter = 0;
var rl = 90;
var rt = h - 250;
var flag = false;
var person = 0;
var moveRight = false;
var moveLeft = false;
var mousex;
runGame();
$("#upgrade").hide();
document.addEventListener("mousemove", function(e) {
  mousex = e.pageX
})
document.addEventListener("keydown", function(e) {
  if (e.which == 32 && !shootbool) {
    $("#rock").remove();
    rl = 90;
    rt = h - 250;
    shoot = true;
  }
  if (e.which == 68) {
    moveRight = true;
  }
  if (e.which == 65) {
    moveLeft = true;
  }
})
document.addEventListener("keyup", function(e) {
  if (e.which == 32 && !shootbool) {
    shootbool = true;
    shoot = false;
    spot = ((w - 110) / 100) * power;
    x = spot + 100
    y = h - 10
    document.getElementById("power").value = power;
    $("#game").append("<div id='rock'></div>")
    $("#rock").css("background", rockColor)
    $("#rock").css("width", size);
    $("#rock").css("height", size);
    var slopey = (y - rt)
    var slopex = (x - rl)
    var distance = Math.sqrt((slopex ** 2) + (slopey ** 2))
    var speed = 1;
    if ((slopex / distance)*(power * 0.04) >= 1) {
      speed = power * 0.04
    }
    slopey = (slopey / distance)*speed;
    slopex = (slopex / distance)*speed;
    shooting = setInterval(function() {
      if (rt >= h) {
        clearInterval(shooting);
        shootbool = false;
        power = 0;
        document.getElementById("power").value = power;
      }
      if ($("#rock").length == 1) {
        rt += slopey;
        rl += slopex;
        $("#rock").css("top", rt);
        $("#rock").css("left", rl);
      }
    })
  }
  if (e.which == 68) {
    moveRight = false;
  }
  if (e.which == 65) {
    moveLeft = false;
  }
})
function runGame() {
  $(document).unbind("keypress");
  $(document).keypress(function(e) {
    if (e.which == 49 && $("#frozenTime").length > 0) {
      rockColor = "lightblue";
    }
    if (e.which == 50 && $("#fireTime").length > 0) {
      rockColor = "red";
      damage = 50;
    }
  });
  $(document).unbind("mousedown");
  $(document).mousedown(function() {
    if (lightningBolts > 0) {
      lightUp();
      lightningBolts -= 1;
      for (i = 0; i < $(".badGuy").length; i++) {
        if ($("#arrow").position().left + 7 > $(".badGuy").eq(i).position().left && $("#arrow").position().left + 7 < $(".badGuy").eq(i).position().left + $(".badGuy").width()) {
          if (i == person) {
            flag = false;
          }
          if (flag && person > i) {
            person -= 1;
          }
          if ($(".badGuy").eq(i).hasClass("small")) {
            money += 1;
          } else if ($(".badGuy").eq(i).hasClass("giant")) {
            money += 4;
          } else {
            money += 2
          }
          $(".badGuy").eq(i).remove();
        }
      }
    }
  })
  $("#money").text("Money: " + money)
  $("#flag").css("left", 110);
  shoot = false;
  power = 0;
  spot;
  shooting;
  w = window.innerWidth;
  h = window.innerHeight;
  x;
  y;
  shootbool = false;
  ncounter = 0;
  scounter = 0;
  bcounter = 0;
  rl = 90;
  rt = h - 250;
  flag = false;
  person = 0;
  lightningBolts = 0;
  $("#lightning").show();
  lightningBolts = store;
  var game = setInterval(function() {
    $("#amountOfLightningBolts").text(lightningBolts)
    $("#arrow").css("left", mousex - 7);
    if (mousex < $("#cloud").position().left + 50) {
      $("#arrow").css("left", $("#cloud").position().left + 50);
    } else if (mousex > $("#cloud").position().left + 295) {
      $("#arrow").css("left", $("#cloud").position().left + 295);
    } else {
      $("#arrow").css("left", mousex - 7);
    }
    if (moveRight && $("#cloud").position().left < w - 350) {
      $("#cloud").css("left", $("#cloud").position().left + cloudSpeed)
    }
    if (moveLeft && $("#cloud").position().left > 0) {
      $("#cloud").css("left", $("#cloud").position().left - cloudSpeed)
    }
    $("#money").text("Money: " + money)
    if (shoot) {
      if (power < 100) {
        power += increase;
      }
      document.getElementById("power").value = power;
    }
    ncounter += 1;
    scounter += 1;
    bcounter += 1;
    if (ncounter > 200 && !flag) {
      $("#game").append("<div class='badGuy'><progress class='bG' value='100' max='100'></progress></div>");
      ncounter = 0;
    }
    if (scounter > 300 && !flag) {
      $("#game").append("<div class='badGuy small'><progress class='bG' value='100' max='100'></progress></div>");
      scounter = 0;
    }
    if (bcounter > 500 && !flag) {
      $("#game").append("<div class='badGuy giant'><progress class='bG' value='100' max='100'></progress></div>");
      bcounter = 0;
    }
    if ($("#flag").position().left > w) {
      $("#game").hide();
      clearInterval(game);
      clearInterval(shooting);
      $(document).unbind("click");
      $(".badGuy").remove();
      upgrade();
    }
    if ($(".badGuy").length > 0) {
      for (var i = 0; i < $(".badGuy").length; i++) {
        if (frozen != i) {
          var bl = $(".badGuy").eq(i).position().left
          var bt = $(".badGuy").eq(i).position().top
          if ((bl == $("#flag").position().left || bl == $("#flag").position().left + 1)  && !flag){
            flag = true;
            person = i;
          }
          else if (bl > $("#flag").position().left && !flag) {
            if ($(".badGuy").eq(i).hasClass("small")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left - 2)
            } else if ($(".badGuy").eq(i).hasClass("giant")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left - 0.5)
            } else {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left - 1)
            }
          } else if (bl < $("#flag").position().left && !flag){
            if ($(".badGuy").eq(i).hasClass("small")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 2)
            } else if ($(".badGuy").eq(i).hasClass("giant")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 0.5)
            } else {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 1)
            }

          }
          if (flag && i == person) {
            if ($(".badGuy").eq(i).hasClass("small")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 2)
            }  else if ($(".badGuy").eq(i).hasClass("giant")) {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 0.5)
            }else {
              $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 1)
            }
          }
        }
        if ((rl >= bl && rl <= bl + $(".badGuy").eq(i).width() && rt >= bt && rt <= bt + $(".badGuy").eq(i).height()) || (rl + size >= bl && rl + size<= bl + $(".badGuy").eq(i).width() && rt + size >= bt && rt + size <= bt + $(".badGuy").eq(i).height())) {
          if (i == person) {
            flag = false;
          }
          $("#rock").remove();
          clearInterval(shooting);
          shootbool = false;
          power = 0;
          rl = 90;
          rt = h - 250;
          document.getElementById("power").value = power;
          if ($(".badGuy").eq(i).hasClass("small")) {
            document.getElementsByClassName("bG")[i].value -= damage * 4;
          } else if ($(".badGuy").eq(i).hasClass("giant")) {
            document.getElementsByClassName("bG")[i].value -= damage;
          } else {
            document.getElementsByClassName("bG")[i].value -= damage * 2;
          }
          if (document.getElementsByClassName("bG")[i].value <= 0) {
            if (flag && person > i) {
              person -= 1;
            }
            if (freezeCount > 0 && frozen > i) {
              frozen -= 1;
            }
            if (i == frozen) {
              frozen = -1;
            }
            if ($(".badGuy").eq(i).hasClass("small")) {
              money += 1;
            } else if ($(".badGuy").eq(i).hasClass("giant")) {
              money += 4;
            } else {
              money += 2
            }
              $(".badGuy").eq(i).remove();
            }
            else {
            if (rockColor == "lightblue") {
                frozen = i;
                freezeCount += 1;
            }
          }
        }
      }
    }
    if (flag) {
      $("#flag").css("left", $(".badGuy").eq(person).position().left);
    }
    if (freezeCount > 0) {
      freezeCount += 1;
      if (freezeCount > 300) {
        freezeCount = 0;
        frozen = -1;
      }
    }
  }, 30)
}
function upgrade() {
  $("#lightning").hide();
  $("document").unbind("click")
  $("#continue").unbind("click")
  $("speed").unbind("click")
  $("#size").unbind("click")
  $("#storeLightning").unbind("click")
  $("#storeCloud").unbind("click")
  $("#freezeRock").unbind("click")
  $("#upgrade").show();
  var dx = 1;
  $("#size").click(function() {
    if (money > 49) {
      size += 1;
      money -= 50;
    }
  });
  $("#speed").click(function() {
    if (money > 24) {
      increase += 0.5;
      money -= 25
    }
  });
  $("#continue").click(function() {
    clearInterval(progress);
    clearInterval(game);
    clearInterval(shooting);
    $("#upgrade").hide();
    $("#game").show();
    runGame();
  });
  $("#storeLightning").click(function() {
    if (money > 99) {
      money -= 100;
      store += 1;
    }
  });
  $("#storeCloud").click(function() {
    if (money > 24) {
      money -= 25;
      cloudSpeed += 1;
    }
  });
  $("#freezeRock").click(function() {
      $("#game").append("<div class='changeRock'><progress id='freezeProgress' max='100' value='100'></progress><div class='case'><div id='frozenTime'>1</div></div></div>");
  });
  $("#fireRock").click(function() {
      $("#game").append("<div class='changeRock'><progress id='fireProgress' max='100' value='100'></progress><div class='case'><div id='fireTime'>2</div></div></div>");
      $(".changeRock").eq(1).css("left", "80px")
  });
  $("#explodingRock").click(function() {
      $("#game").append("<div class='changeRock'><progress id='explodeProgress' max='100' value='100'></progress><div class='case'><div id='explodeTime'>3</div></div></div>");
      $(".changeRock").eq(2).css("left", "160px")
  });
  var progress = setInterval(function() {
    if (document.getElementById("speed").value == 100) {
      document.getElementById("speed").value = 0;
    }
    document.getElementById("speed").value += dx;
  }, 10)
}
function lightUp() {
  var opacity = 1;
  var lightning = setInterval(function() {
    $("#lightning").css("opacity", opacity);
    opacity -= 0.01;
    if (opacity <= 0) {
      clearInterval(lightning);
    }
  }, 10)
}
