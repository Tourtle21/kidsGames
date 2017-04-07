$("#play").click(function() {
  $("#loadScreen").remove();
})

var keyState = {}
left = 8;
posTop = 8;
document.addEventListener("keydown", (e) => {keyState[e.code] = true})
document.addEventListener("keyup", (e) => {keyState[e.code] = false})
game = new Audio("game.wav");
setInterval(function() {
  game.play();
  if (keyState["ArrowUp"]) {
    posTop -= 1;
    $("#character").css("top", posTop);

  }
  if (keyState["ArrowDown"]) {
    posTop += 1;
    $("#character").css("top", posTop);

  }
  if (keyState["ArrowRight"]) {
    left += 1;
    $("#character").css("left", left);

  }
  if (keyState["ArrowLeft"]) {
    left -= 1;
    $("#character").css("left", left);

  }
}, 10)
