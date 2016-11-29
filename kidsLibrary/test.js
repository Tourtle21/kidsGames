setBackground("orange")
createCharacter("bird", "green", "50px", "50px", "10px", "10px");
loop(function() {
  if (spacePressed()){
    move("bird", "up", 15);
  } else {
    move("bird", "down", 15);
  }
  moveObjects("wall", "left", 5)
  console.log(objectWithCharacter("bird", "wall", "all") != undefined) 
  if (objectWithCharacter("bird", "wall", "all") != undefined) {
    remove("wall", objectWithCharacter("bird", "wall", "all"));
  }
}, 50);
loop(function() {
  createObjects("wall", "grey", screenBottom + "px", "50px", "0px", screenRight - 50 + "px");
}, 1000)
