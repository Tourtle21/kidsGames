createCharacter("guys", "blue", "100px", "50px", (screenBottom/2 - 50) + "px", (screenRight/2 - 25) + "px");
createCharacter("guys1", "green", "100px", "50px", (screenBottom/2-50) + "px", (screenRight/2 - 25) + "px");
createCharacter("team1", "blue", "50px", "50px", (screenBottom-150) + "px", "5px");
createCharacter("team2", "green", "50px", "50px", (screenBottom-75) + "px", "5px");
createCharacter("score1", "none", "50px", "100px", (screenBottom-135) + "px", "60px");
createCharacter("score2", "none", "50px", "100px", (screenBottom-60) + "px", "60px");
createObjects("colors", "orange", "5px", "5px", (screenBottom/4-2.5) + "px", (screenRight/4-2.5) + "px");
createObjects("colors", "yellow", "5px", "5px", ((screenBottom/4)*3-2.5) + "px", ((screenRight/4)*3-2.5) + "px");
document.getElementById("guys").style.zIndex = 1;
document.getElementById("guys1").style.zIndex = 1;
width = 5;
score1 = 0;
score2 = 0;
color = "yellow"
document.getElementById("score1").innerHTML = "Score: " + score1;
document.getElementById("score2").innerHTML = "Score: " + score2;
loop(function() {
  width += 2;
  color1 = document.getElementsByClassName("colors")[0]
  color2 = document.getElementsByClassName("colors")[1]
  color1.style.width = width + "px";
  color1.style.height = width + "px";
  color2.style.width = width + "px";
  color2.style.height = width + "px";
  moveObjects("colors", "left", 1, 0);
  moveObjects("colors", "up", 1, 0);
  if (width > 300) {
    for (i = 0; i < document.getElementsByClassName("colors").length; i++) {
      var boxColor = document.getElementsByClassName("colors")[i].style.background
      boxColor = boxColor.slice(color.length * -1);
      if (objectWithCharacter("guys", "colors", i)) {
        if (boxColor == color) {
          score1 += 1;
          document.getElementById("score1").innerHTML = "Score: " + score1;
        } else {
          score1 -= 1;
          document.getElementById("score1").innerHTML = "Score: " + score1;
        }
      }
      if (objectWithCharacter("guys1", "colors", i)) {
        if (boxColor == color) {
          score2 += 1;
          document.getElementById("score2").innerHTML = "Score: " + score2;
        } else {
          score2 -= 1;
          document.getElementById("score2").innerHTML = "Score: " + score2;
        }
      }
    }
    remove("colors", 1);
    remove("colors", 0)
    createObjects("colors", "orange", "5px", "5px", (screenBottom/4-2.5) + "px", (screenRight/4-2.5) + "px");
    createObjects("colors", "yellow", "5px", "5px", ((screenBottom/4)*3-2.5) + "px", ((screenRight/4)*3-2.5) + "px");
    width = 5;

  }
  top1 = parseInt(document.getElementById("guys").style.top.slice(0, -2));
  left1 = parseInt(document.getElementById("guys").style.left.slice(0, -2));
  top2 = parseInt(document.getElementById("guys1").style.top.slice(0, -2));
  left2 = parseInt(document.getElementById("guys1").style.left.slice(0, -2));
    if (upPressed() && top1 > 0){
      move("guys", "up", 2);
    }
    if (downPressed() && top1 < screenBottom - 102){
      move("guys", "down", 2);
    }
    if (rightPressed() && left1 < screenRight - 50){
      move("guys", "right", 2);
    }
    if (leftPressed() && left1 > 0){
      move("guys", "left", 2);
    }
    if (checkKey("w") && top2 > 0){
      move("guys1", "up", 2);
    }
    if (checkKey("s") && top2 < screenBottom - 102){
      move("guys1", "down", 2);
    }
    if (checkKey("d") && left2 < screenRight - 50){
      move("guys1", "right", 2);
    }
    if (checkKey("a") && left2 > 0){
      move("guys1", "left", 2);
    }

}, 10)
