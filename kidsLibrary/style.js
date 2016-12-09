var character = {}
var objects = {}
var space = false;
var screenTop = 0;
var screenBottom = window.innerHeight;
var screenLeft = 0;
var screenRight = window.innerWidth;
var upArrow = false;
var downArrow = false;
var leftArrow = false;
var rightArrow = false;
var keys = [];
document.addEventListener("keydown", function(e) {
  key = e.which;
  character = String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)
  keys.push(character);
  console.log(e.which)
  if (e.which == 32){
    space = true;
  }
  if (e.which == 37){
    leftArrow = true;
  }
  if (e.which == 39){
    rightArrow = true;
  }
  if (e.which == 40){
    downArrow = true;
  }
  if (e.which == 38){
    upArrow = true;
  }
})
function pullOut(character) {
  index = keys.indexOf(character)
  keys.splice(index, 1);
  if (keys.indexOf(character) > - 1) {
    pullOut(character)
  }

}
document.addEventListener("keyup", function(e) {
  key = e.which;
  character = String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)
  pullOut(character)
  if (e.which == 32){
    space = false;
  }
  if (e.which == 37){
    leftArrow = false;
  }
  if (e.which == 39){
    rightArrow = false;
  }
  if (e.which == 40){
    downArrow = false;
  }
  if (e.which == 38){
    upArrow = false;
  }
})
function setBackground(type) {
  document.getElementsByTagName("body")[0].style.background = type;
  document.getElementsByTagName("body")[0].style.backgroundRepeat = "no-repeat";
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
  console.log(document.getElementById(object).style.top.slice(0, -2) + amount)
  if (direction == "down") {
    document.getElementById(object).style.top = parseInt(document.getElementById(object).style.top.slice(0, -2)) + amount + "px";
  }
  if (direction == "up") {
    document.getElementById(object).style.top = document.getElementById(object).style.top.slice(0, -2) - amount + "px";
  }
  if (direction == "left") {
    document.getElementById(object).style.left = parseInt(document.getElementById(object).style.left.slice(0, -2)) - amount + "px";
  }
  if (direction == "right") {
    document.getElementById(object).style.left = parseInt(document.getElementById(object).style.left.slice(0, -2)) + amount + "px";
  }
}
function spacePressed() {
  return space;
}
function rightPressed() {
  return rightArrow;
}
function leftPressed() {
  return leftArrow;
}
function downPressed() {
  return downArrow;
}
function upPressed() {
  return upArrow;
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
function checkKey(key) {
  return keys.indexOf(key.toUpperCase()) > -1;
}
function changeColor(name, color) {
  console.log(document.getElementById(name))
  document.getElementById(name).style.backgroundColor = color;
}
function checkColor(name) {
  return document.getElementById(name).style.backgroundColor;
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
