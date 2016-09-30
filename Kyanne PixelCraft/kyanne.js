var clicked = "none"
var list = ["Kyanne", "Kaden", "Kody", "Oliver"]
$("#play").click(function() {
  $("#main").hide()
  $("#resumeOrNew").css("visibility", "visible")
});
$("#resume").click(function() {
  $("#resumeOrNew").css("visibility", "hidden")
  for (var i = 0; i < list.length; i++) {
    var $div = "<div class='name'>"+ list[i] + "</div>"
    $("body").append($div);
  }
})
$(".check").click(function() {
  if ($(this).hasClass("boy")) {
    changeColor("boy")
  } else {
    changeColor("girl")
  }
})
$("#boy").click(function() {
  changeColor("boy")
})
$("#girl").click(function() {
  changeColor("girl")
})
$("#new").click(function() {
  $("#resumeOrNew").css("visibility", "hidden")
  $("#choosePlayer").css("visibility", "visible")
  $("body").css("background-color", "turquoise")
})
function changeColor(gender) {
  console.log(gender, clicked)
  if (clicked == "none") {
    $("." + gender).css("background-color", "green")
    if (gender == "boy") {
      clicked = "boy"
    } else {
      clicked = "girl"
    }
  }
  else if(gender == "boy") {
    if (clicked == "boy") {
      $("." + gender).css("background-color", "white");
      clicked = "none"
    } else {
      $("." + gender).css("background-color", "green");
      $(".girl").css("background-color", "white");
      clicked = "boy"
    }
  } else {
    if (clicked == "girl") {
      $("." + gender).css("background-color", "white");
      clicked = "none"
    } else {
      $("." + gender).css("background-color", "green");
      $(".boy").css("background-color", "white");
      clicked = "girl"
    }
  }
}
$("#creative").click(function() {
  var interval;
  $("#choosePlayer").css("visibility", "hidden")
  $("body").css("background-color", "white")
  var count = -1;
  var breaking = 1;
  for (var col = 0; col < window.innerWidth / 20; col++) {
    for (var row = 0; row < window.innerHeight / 20; row++) {
      var $square = "<div class='square "+ col + "'></div>"
      count += 1;
      $("body").append($square);
      $(".square").eq(count).css("top", row * 20)
      $(".square").eq(count).css("left", col * 20)
      if (row > 20) {
        $(".square").eq(count).css("background-color", "#663300")
        $(".square").eq(count).mousedown(function() {
          $this = $(this)
          if ($(this).css("opacity") > 0) {
            interval = setInterval(function() {
              breaking -= 1;
              $this.css("opacity", breaking)
            }, 500)
          }
        })
        $(".square").eq(count).mouseup(function() {
          if ($(this).css("opacity") > 0) {
            $(this).css("opacity", 1)
          } else {
            $(this).css("background-color", "lightblue")
            $(this).css("opacity", 1)
          }
          $(this).hover(function(){
            $(this).css("opacity", "0.4");
          }, function(){
            $(this).css("opacity", "1");
          });
          fall()
          breaking = 1;
          var ground = clearInterval(interval)

        })
      }
    }
  }
  function checkGround() {
    var check = "";
    if ($("#character").position().left + 24 > $("." + Math.ceil(($("#character").position().left / 20) + 1)).eq(0).position().left) {
      check = "right"
    } else if ($("#character").position().left + 9 < $("." + Math.round(($("#character").position().left / 20))).eq(0).position().left) {
      check = "left"
    }
    for (var i = 0; i < $("." + Math.ceil($("#character").position().left / 20)).length; i++) {
      if ($("." + Math.round($("#character").position().left / 20)).eq(i).css("background-color") == "rgb(102, 51, 0)") {
        return ($("." + Math.round($("#character").position().left / 20)).eq(i).position().top)
      }
      if (check == "right") {
        if ($("." + (Math.round($("#character").position().left / 20) + 1)).eq(i).css("background-color") == "rgb(102, 51, 0)") {
          return ($("." + (Math.round($("#character").position().left / 20) + 1)).eq(i).position().top)
        }
      }
      if (check == "left") {
        if ($("." + (Math.round($("#character").position().left / 20) - 1)).eq(i).css("background-color") == "rgb(102, 51, 0)") {
          return ($("." + (Math.round($("#character").position().left / 20) - 1)).eq(i).position().top)
        }
      }
    }
  }
  $character = "<div id='character'></div>"
  $("body").append($character)
  console.log(clicked)
  if (clicked == "girl") {
    console.log($("#character"))
    $("#character").css("background", "url('./images/alex-skin.png')")
  }
  $("#character").css("background-position", "-108px -24px")
  $("#character").css("background-size", "300px 182.4px")
  function fall() {
    var groundY = checkGround()
    console.log(groundY)
    var fall = setInterval(function () {
      $("#character").css("top", $("#character").position().top + 5)
      if ($("#character").position().top <= groundY - 129 && $("#character").position().top >= groundY - 139) {
        $("#character").css("top", groundY - 134)
        clearInterval(fall)
      }
    }, 10)
  }
  $(document).keydown(function(e) {
    if (e.which == 32) {
      fall()
    }
  })

})
