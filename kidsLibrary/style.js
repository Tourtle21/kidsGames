var character = {}
var objects = {}
var space = false;
var screenTop = 0;
var screenBottom = window.innerHeight;
var screenLeft = 0;
var screenRight = window.innerWidth;
document.addEventListener("keydown", function(e) {
  if (e.which == 32){
    space = true;
  }
})
document.addEventListener("keyup", function(e) {
  if (e.which == 32){
    space = false;
  }
})
function setBackground(type) {
  document.getElementsByTagName("body")[0].style.background = type;
  document.getElementsByTagName("body")[0].style.backgroundSize = "100% 100%";
}
function createCharacter(name, background, height, width, top, left) {
  var div = document.createElement("div");
  div.id = name;
  div.style.background = background;
  div.style.backgroundSize = "100% 100%";
  div.style.height = height;
  div.style.width = width;
  div.style.position = "absolute";
  div.style.top = top;
  div.style.left = left;
  character[name] = {top: parseInt(top.slice(0, -2)), left: parseInt(left.slice(0, -2))}
  document.body.appendChild(div);
}
function loop(action, time) {
  setInterval(function() {
    action()
  }, time)
}
function move(object, direction, amount) {
  if (direction == "down") {
    document.getElementById(object).style.top = character.bird.top + 1 + "px";
    character.bird.top += amount;
  }
  if (direction == "up") {
    document.getElementById(object).style.top = character.bird.top - 1 + "px";
    character.bird.top -= amount;
  }
  if (direction == "left") {
    document.getElementById(object).style.left = character.bird.left - 1 + "px";
    character.bird.left -= amount;
  }
  if (direction == "right") {
    document.getElementById(object).style.left = character.bird.left + 1 + "px";
    character.bird.left += amount;
  }
}
function spacePressed() {
  return space;
}
function moveObjects(name, direction, amount) {
  if (document.getElementsByClassName(name).length != 0) {
    for (var i = 0; i < objects[name].length; i++) {
      var itemTop = document.getElementsByClassName(name)[i].style.top
      var itemLeft = document.getElementsByClassName(name)[i].style.left
      if (direction == "down") {
        document.getElementsByClassName(name)[i].style.top = parseInt(itemTop.slice(0, -2)) + amount + "px";
      }
      if (direction == "up") {
        document.getElementsByClassName(name)[i].style.top = parseInt(itemTop.slice(0, -2)) - amount + "px";
      }
      if (direction == "left") {
        document.getElementsByClassName(name)[i].style.left = parseInt(itemLeft.slice(0, -2)) - amount + "px";
      }
      if (direction == "right") {
        document.getElementsByClassName(name)[i].style.left = parseInt(itemLeft.slice(0, -2)) + amount + "px";
      }
    }
  }
}
function createObjects(name, background, height, width, top, left) {
  if (objects[name] == undefined) {
    objects[name] = [];
  }
  var div = document.createElement("div");
  div.className = name;
  div.style.background = background;
  div.style.backgroundSize = "100% 100%";
  div.style.height = height;
  div.style.width = width;
  div.style.position = "absolute";
  div.style.top = top;
  div.style.left = left;
  objects[name].push("div");
  document.getElementsByTagName("body")[0].append(div);
}
function objectWithCharacter(name1, name2, number) {
  if (number != "all") {
    console.log("!all")
    firstTop = parseInt(document.getElementById(name1).style.top.slice(0, -2));
    firstLeft = parseInt(document.getElementById(name1).style.left.slice(0, -2));
    secondTop = parseInt(document.getElementsByClassName(name2)[number].style.top.slice(0, -2));
    secondLeft = parseInt(document.getElementsByClassName(name2)[number].style.left.slice(0, -2));
    firstWidth = parseInt(document.getElementById(name1).style.width.slice(0, -2));
    secondWidth = parseInt(document.getElementsByClassName(name2)[number].style.width.slice(0, -2));
    firstHeight = parseInt(document.getElementById(name1).style.height.slice(0, -2));
    secondHeight = parseInt(document.getElementsByClassName(name2)[number].style.height.slice(0, -2));
    if ((firstLeft + firstWidth > secondLeft && firstLeft < secondLeft + secondWidth) && (firstTop + firstHeight > secondTop && firstTop < secondTop + secondHeight)) {
      return number
    }
  }else {
    console.log("all")
    for (i = 0; i < document.getElementsByClassName(name2).length; i++) {
      firstTop = parseInt(document.getElementById(name1).style.top.slice(0, -2));
      firstLeft = parseInt(document.getElementById(name1).style.left.slice(0, -2));
      secondTop = parseInt(document.getElementsByClassName(name2)[i].style.top.slice(0, -2));
      secondLeft = parseInt(document.getElementsByClassName(name2)[i].style.left.slice(0, -2));
      firstWidth = parseInt(document.getElementById(name1).style.width.slice(0, -2));
      secondWidth = parseInt(document.getElementsByClassName(name2)[i].style.width.slice(0, -2));
      firstHeight = parseInt(document.getElementById(name1).style.height.slice(0, -2));
      secondHeight = parseInt(document.getElementsByClassName(name2)[i].style.height.slice(0, -2));
      if ((firstLeft + firstWidth > secondLeft && firstLeft < secondLeft + secondWidth) && (firstTop + firstHeight > secondTop && firstTop < secondTop + secondHeight)) {
        return i;
      }
    }
  }
}
function remove(name, number) {
  if (number == undefined) {
    document.getElementById(name).remove();
  } else {
    document.getElementsByClassName(name)[number].remove();
    var index = objects[name].indexOf(number);
    objects[name].splice(index, 1);
  }
}
function getPositionTop(name, number) {
  if (number == undefined) {
    return character[name].top;
  } else {
    return parseInt(document.getElementsByClassName(name)[number].style.top.slice(0, -2));
  }
}
function getPositionLeft(name, number) {
  if (number == undefined) {
    return character[name].left;
  } else {
    return parseInt(document.getElementsByClassName(name)[number].style.left.slice(0, -2));
  }
}
//setBackground is used setBackground("black") or setBackground("url(chicken.png)")
//createCharacter is used for only creating one person or object Ex: createCharacter(name, background, height, width, how far from the top, and left);
//loop is used for making something run the whole game and is used loop(function() {something}, time)
//move is used to move your characters used move(name of object, direction, how far to move each time)
//spacePressed return true or false whether space is pressed or not;
//moveObjects is used to move all objects with the same name is used the same way as the move function;
//createObjects is used to create objects that you are going to use more than once and is used the same as createcharacter;
//objectWithCharacter is used to check collision detection between characters and objects is used objectWithCharacter(character name, objects name, which object you want to check or all to check all objects)
//remove is used to remove an object or character from the screen is used remove(name, number if an object)
//getPositionTop is used to find out what the position of an object or character is used getPositionTop(name, number if an object);
//getPositionLeft is used to find out what the position of an object or character used same as position top
