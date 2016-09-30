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
var rl = 90;
var rt = h - 250;
var flag = false;
var person = 0;
document.addEventListener("keypress", function(e) {
  if (e.which == 32 && !shootbool) {
    $("#rock").remove();
    rl = 90;
    rt = h - 250;
    shoot = true;
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
})
var game = setInterval(function() {
  if (shoot) {
    if (power < 100) {
      power += 1;
    }
    document.getElementById("power").value = power;
  }
  ncounter += 1;
  scounter += 1;
  if (ncounter > 200 && !flag) {
    $("#game").append("<div class='badGuy'><progress class='bG' value='100' max='100'></progress></div>");
    ncounter = 0;
  }
  if (scounter > 300 && !flag) {
    $("#game").append("<div class='badGuy small'><progress class='bG' value='100' max='100'></progress></div>");
    scounter = 0;
  }
  if (flag) {
    $("#flag").css("left", $(".badGuy").eq(person).position().left);
  }
  if ($("#flag").position().left > w) {
    $("#game").remove();
    $("body").css("background", "red")
    $("body").append("<div id='gameOver'>You lost</div>")
    clearInterval(game);
  }
  if ($(".badGuy").length > 0) {
    for (var i = 0; i < $(".badGuy").length; i++) {
      var bl = $(".badGuy").eq(i).position().left
      var bt = $(".badGuy").eq(i).position().top
      if (bl > $("#flag").position().left && !flag) {
        $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left - 1)
      } else if (bl < $("#flag").position().left && !flag){
        $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 1)
      } else if (bl == $("#flag").position().left && !flag){
        flag = true;
        person = i;
      }
      if (flag && i == person) {
        $(".badGuy").eq(i).css("left", $(".badGuy").eq(i).position().left + 1)
      }
      if (rl >= bl && rl <= bl + 25 && rt >= bt && rt <= bt + 50) {
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
        document.getElementsByClassName("bG")[i].value -= 50;
        if (document.getElementsByClassName("bG")[i].value == 0) {
          $(".badGuy").eq(i).remove();
        }
      }
    }
  }
}, 30)
