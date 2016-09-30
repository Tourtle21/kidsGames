var up = false;
var down = false;
var left = false;
var right = false;
var pressed = false;
var key = "up"
var begin = false;
$(document).keydown(function(e) {
  console.log(e.which, "down")
  if (e.which == 38) {
    // $("#character").css("width", "50px")
    up = true;
  }
  if (e.which == 40) {
    // $("#character").css("width", "35px")
    down = true;
  }
  if (e.which == 37) {
    // $("#character").css("width", "37px")
    left = true;
  }
  if (e.which == 39) {
    // $("#character").css("width", "40px")
    right = true;
  }
  if (e.which == 32) {
    // begin = true;
    pressed = true;
    slice(key)
  }
})

$(document).keyup(function(e) {
  if (e.which == 38) {
    up = false;
  }
  if (e.which == 40) {
    down = false;
  }
  if (e.which == 37) {
    left = false;
  }
  if (e.which == 39) {
    right = false;
  }
})
function slice(x) {
    var position = -15;
    var count = 0;
    var slice = setInterval(function() {
      if (count < 4) {
        position -= 100
        $("#character").css("background-position", position + "px "+ x +"px")
        count += 1
      } else {
        clearInterval(slice)
        begin = true;
        pressed = false;
      }
    }, 100)
}
setInterval(function() {
  if (pressed) {

  }
  else if (up) {
    if (key == "148") {
      $("#character").css("top", $("#character").position().top + 8)
    } if (key == "-153") {
      $("#character").css("top", $("#character").position().top + 12)
    }
    $("#character").css("top", $("#character").position().top - 1)
    $("#character").css("background-position", "-15px 34px")
    $("#character").css("height", "34px")
    $("#character").css("width", "50px")
    key = "47"
  }
  else if (down) {
    if (key == "148") {
      $("#character").css("top", $("#character").position().top + 8)
    } if (key == "-153") {
      $("#character").css("top", $("#character").position().top + 12)
    }
    $("#character").css("top", $("#character").position().top + 1)
    $("#character").css("background-position", "-15px -65px")
    $("#character").css("height", "34px")
    $("#character").css("width", "50px")
    key = "-60"
  }
  else if (left) {
    if (($("#character").position().top > 520 && $("#character").position().left > 396) || $("#character").position().top < 520) {
      if (key == "47" || key == "-60") {
        $("#character").css("top", $("#character").position().top - 12)
      }
      $("#character").css("left", $("#character").position().left - 1)
      $("#character").css("background-position", "-40px -154px")
      $("#character").css("height", "46px")
      $("#character").css("width", "36px")
      key = "-153"
    }
  }
  else if (right) {
    if (key == "47" || key == "-60") {
      $("#character").css("top", $("#character").position().top - 8)
    }
    $("#character").css("left", $("#character").position().left + 1)
    $("#character").css("background-position", "-22px 142px")
    $("#character").css("height", "42px")
    $("#character").css("width", "40px")
    key = "148"
  }
  var characterLeft = $("#character").position().left;
  var characterTop = $("#character").position().top;
  var badLeft = $("#bad").position().left;
  var badTop = $("#bad").position().top;
  var leftDiff = characterLeft - badLeft;
  var topDiff = characterTop - badTop;
  if (begin) {
    if (Math.abs(leftDiff) > Math.abs(topDiff)) {
      if (leftDiff > 0) {
        $("#bad").css("left", badLeft + 0.5)
        $("#bad").css("background-position", "-24px -249px")
      } else {
        $("#bad").css("left", badLeft - 0.5)
        $("#bad").css("background-position", "-42px -149px")
      }
    } else {
      if (topDiff > 0) {
        $("#bad").css("top", badTop + 0.5)
        $("#bad").css("background-position", "86px -49px")
      } else {
        $("#bad").css("top", badTop - 0.5)
        $("#bad").css("background-position", "-125px -349px")
      }
    }
  }
}, 10)
function createBegginingBoard() {
  var rock = "<div class='rock'></div>"
  var hide = "<div class='rock hide'></div>"
  var y = 0;
  var x = 0;
  position = 35;
  var start = []
  for (var i = 0; i < window.innerHeight / 50; i++) {
    $("body").append(rock)
    $(".rock").eq(i).css("top", position)
    position += 35;
    y = position;
  }
  var length = $(".rock").length
  position = 0
  var diff = ((length + 1 + (window.innerWidth / 39) - ($(".rock").length)))
  for (var i = $(".rock").length; i < (length + 1 + (window.innerWidth / 39)); i++) {
    var Othdiff = ((length + 1 + (window.innerWidth / 39) - ($(".rock").length)))
    if (diff / 3 < Othdiff && diff / 1.5 > Othdiff) {
      $("body").append(hide)
      $(".rock").eq(i).css("top", y)
      $(".rock").eq(i).css("left", position)
      start.push($(".rock").eq(i).position().left);
    } else {
        $("body").append(rock)
    }

    $(".rock").eq(i).css("top", y)
    $(".rock").eq(i).css("left", position)
    position += 35;
    x = position;
  }
  var length = $(".rock").length
  position = y;
  for (var i = $(".rock").length; i < (length + 1 + (window.innerHeight / 50)); i++) {
    $("body").append(rock)
    $(".rock").eq(i).css("top", position)
    $(".rock").eq(i).css("left", x)
    position -= 35;
  }
  var length = $(".rock").length
  position = y
  for (var i = $(".rock").length; i < 4 + length; i++) {
     $("body").append(rock)
     $(".rock").eq(i).css("top", position)
     $(".rock").eq(i).css("left", start[0])
     position += 35
  }
  var length = $(".rock").length
  position = y
  for (var i = $(".rock").length; i < 4 + length; i++) {
     $("body").append(rock)
     $(".rock").eq(i).css("top", position)
     $(".rock").eq(i).css("left", start[start.length - 1])
     position += 35

  }
  var length = $(".rock").length
  position = 0
  y = 0;
  for (var i = $(".rock").length; i < (length + 1 + (window.innerWidth / 38)); i++) {
    $("body").append(rock)
    $(".rock").eq(i).css("top", y)
    $(".rock").eq(i).css("left", position)
    position += 35;
    x = position;
  }
  $("body").append("<div id='character'></div>")
  $("#character").css("left", "calc(50% - 20px)")
  $("#character").css("top", "calc(90%)")
  $(".hide").hide()
  $("body").append("<div id='bad'></div>");
}
createBegginingBoard();
