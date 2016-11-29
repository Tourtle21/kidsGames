var pause = false;
var game;
var restart;
var otherRestart;
function game() {
  $("#message").text("Good Job! You have gathered enough food to last through the winter");
  $("#button").text("Next Level");
  $("#button").unbind("click");
  console.log("hi")
  $("#instructions").css("display", "none");
  $("#game").css("display", "block");
  $("#ant").css("width", $(window).width()/5)
  $("#ant").css("height", $(window).width()/10)
  var foodList = ["mushroom", "strawberry", "apple", "orange", "chicken", "pear", "tomatoe", "fish", "pepper", "cherry", "carrot", "eggplant", "banana", "raddish", "watermelon"]
  $("#food").css("background", "url(images/"+foodList[Math.floor(Math.random() * foodList.length)]+ ".svg)")
  var right = false;
  var left = false;
  var x = 0;
  var y = $(window).height() - $("#ant").height();
  var rainTime = 0;
  var carry = false;
  var filled = 0;
  $("#filler").css("height", 0);
  $("#filler").css("top", $("#basket").height());
  var chance = 0;
  var color = "url(images/leaves/leaf-01.svg)"
  var type = 1;
  var mainColor = "url(images/leaves/raindrop-01.svg)"
  var max = 100;
  var level = 1;
  var score = 0;
  $("#score").text("Score: " + score)
  var amount = 100 / (level + 2);
  $("#ant").css("top", y);
  document.addEventListener("touchstart", function(e) {
    if (!carry) {
      right = true;
      left = false;
      $("#ant").css("transform", "scaleX(1)")
    } else {
      left = true;
      right = false;
      $("#ant").css("transform", "scaleX(-1)")
    }
  })
  document.addEventListener("touchend", function(e) {
    if (!carry) {
      right = false;
      left = false;
    } else {
      left = false;
      right = false;
    }
  })
  document.addEventListener("keydown", function(e) {
    if (e.which == 39) {
      right = true;
      $("#ant").css("transform", "scaleX(1)")
    }
    if (e.which == 37) {
      left = true;
      $("#ant").css("transform", "scaleX(-1)")
    }
    if (e.which == 80) {
      if (pause) {
        pause = false;
      }else {
      pause = true;
    }
    }
  })
  document.addEventListener("keyup", function(e) {
    if (e.which == 39) {
      right = false;
    }
    if (e.which == 37) {
      left = false;
    }
  })
  restart = setInterval(function() {
    if (!pause) {
      if (chance > 1) {
        if (color == "url(images/snowflakes/snowflake-01.svg)") {
          pause = true;
          $("#game").hide();
          $("#nextLevel").show();
          $(".rainDrop").remove();
          $("#message").text("Oh no! You didn't collect enough food for winter")
          $("#button").text("Restart");
          filled = 0;
          clearInterval(restart);
          clearInterval(otherRestart)
          $("#button").click(function() {
            game();
          })
        }
        chance = 0;
        mainColor = color;
        color = "url(images/snowflakes/snowflake-01.svg)";
      }
      $("#ant").css("width", $(window).width()/10)
      $("#ant").css("height", $(window).width()/20)
      y = $(window).height() - $("#ant").height();
      $("#food").css("width", $(window).width()/20)
      $("#food").css("height", $(window).width()/20)
      $("#food").css("left", $(window).width() - $("#food").width())
      $("#food").css("top", $(window).height() - $("#food").height())
      $("#food").css("background-size", "100% 100%")
      $(".raindrop").css("width", $(window).width()/20)
      $(".raindrop").css("height", $(window).width()/20)
      rainTime += 1;
      if (rainTime > 100) {
        rainTime = 0;
        spawnRaindrop();
      }
      if (right && x < $(window).width() - $("#ant").width() - $("#food").width()) {
        x += $(window).width() / 300;
      }
      if (left && x > 0) {
        x -= $(window).width() / 300;
      }
      if (x > $(window).width() - ($("#ant").width() +$("#food").width())) {
        carry = true;
        right = false;
      }
      if (filled >= 100) {
        $("#filler").css("height", 0);
        $("#filler").css("top", $("#basket").height());
        filled = 0;
        level += 1;
        amount = 100 / (level + 2);
        pause = true;
        chance = 0;
        color = "url(images/leaves/leaf-01.svg)";
        mainColor = "url(images/leaves/raindrop-01.svg)"
        $("#game").hide();
        $("#button").text("Start Level " + level)
        $("#nextLevel").show();
        $(".rainDrop").remove();
      }
      if (x <= 0 && carry) {
        score += 1;
        $("#score").text("Score: " + score);
        carry = false;
        left = false;
        $("#food").css("top", $(window).height() - $("#food").width());
        $("#food").css("left", $(window).width() - $("#food").width());
        $("#food").css("background", "url(images/"+foodList[Math.floor(Math.random() * foodList.length)]+ ".svg)");
        filled += amount;
        $("#filler").css("height", filled);
        $("#filler").css("top", $("#basket").height() - filled);
      }
      if (carry) {
        $("#food").css("top", $(window).height() - $("#food").height() * 2);
        $("#food").css("left", $("#ant").position().left + $("#ant").width() / 4)
      }
      $("#ant").css("left", x)
      $("#ant").css("top", y)
    }
  })
  otherRestart = setInterval(function() {
    if (!pause) {
      chance += 0.0002;
      for (var i = 0; i < $(".rainDrop").length; i++) {
        $(".rainDrop").eq(i).css("top", $(".rainDrop").eq(i).position().top + ($(window).height() / 200))
        if ($(".rainDrop").eq(i).position().top + $(".rainDrop").width() > $(window).height() - $("#ant").height() && $(".rainDrop").eq(i).position().left + $(".rainDrop").width() > $("#ant").position().left && $(".rainDrop").eq(i).position().left < $("#ant").position().left + $("#ant").width()) {
          $(".rainDrop").eq(i).remove();
          if (score > 0 && filled > 0) {
            score -= 1;
            $("#score").text("Score: " + score)
          }
          if (filled > 0) {
            filled -= amount;
            $("#filler").css("height", filled);
            $("#filler").css("top", $("#basket").height() - filled)
          }
          if (carry) {
            $("#food").css("top", $(window).height() - $("#food").width());
            $("#food").css("left", $(window).width() - $("#food").width());
            carry = false;
          }
        }
        if ($(".rainDrop").eq(i).position().top > $(window).height()) {
          $(".rainDrop").eq(i).remove();
        }
      }
    }
  }, 10)
  function spawnRaindrop() {
    $("body").append("<div class='rainDrop'></div>")
    $rainDrop = $(".rainDrop").eq($(".rainDrop").length - 1)
    if (mainColor == "url(images/leaves/leaf-01.svg)" && Math.floor(Math.random() * 2 + 1) == 2) {
      $rainDrop.css("background", "url(images/leaves/leaf-02.svg)")
    } else {
      $rainDrop.css("background", mainColor)

    }
    $rainDrop.css("background-size", "100% 100%")
    if (Math.random() < chance) {
      if (color == "url(images/leaves/leaf-01.svg)") {
        color = "url(images/leaves/leaf-0" + Math.floor(Math.random() * 2 + 1) + ".svg)"
        $rainDrop.css("background", color)
        $rainDrop.css("background-size", "100% 100%")
        color = "url(images/leaves/leaf-01.svg)";
      } else {
        color = "url(images/snowflakes/snowflake-0" + Math.floor(Math.random() * 8 + 1) + ".svg)"
        $rainDrop.css("background", color)
        $rainDrop.css("background-size", "100% 100%")
        color = "url(images/snowflakes/snowflake-01.svg)";
      }
    }
    $rainDrop.css("top", -50);
    $rainDrop.css("left", 0 + Math.floor((Math.random() * ($(window).width() - 50))));
  }
}
function unPause() {
  pause = false;
  $("#game").show();
  $("#nextLevel").hide();
}
