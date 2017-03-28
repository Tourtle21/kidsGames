var follow = false;
var item;
var character;
var img;
var x;
var y;
var offLeft = 465;
var offTop = 810;
$(".card").mousedown(function() {
  follow = true;
  item = $(this);
  background = item.css("background-image")
  index = background.indexOf("images")
  character = background.slice(index + 7, -6)
})
$(document).mouseup(function() {
  follow = false;
})
$(document).mousemove(function(e) {
  x = e.clientX;
  y = e.clientY;
  if (!follow) {
    item = "";
  }
})
setInterval(function() {
  if (follow) {
    item.css("left", x - offLeft);
    item.css("top", y - offTop);
    if (y <= window.innerHeight - (window.innerHeight / 6.25)) {
      item.css("background", "url(images/"+character+"Guy.png)")
      item.css("background-size", "100% 100%")
      item.css("height", checkHeights()[0]);
      item.css("width", checkHeights()[1]);
      offLeft = parseInt(item.css("width").slice(0, -2))/2
      offTop = parseInt(item.css("height").slice(0, -2))
    } else {
      item.css("background", "url(images/" + character +".png)")
      item.css("height", "15%")
      item.css("width", "10%")
      item.css("background-size", "100% 100%")
      offLeft = parseInt(item.css("width").slice(0, -2))/2
      offTop = parseInt(item.css("height").slice(0, -2))/2
    }
  } else if (y > window.innerHeight - (window.innerHeight / 6.25) && item){
    id = parseInt(item.attr("id").slice(-1));
    if (id == 1) {
      item.css("left", "29%");
    }
    else if (id == 2) {
      item.css("left", "40%");
    }
    else if (id == 3) {
      item.css("left", "50.5%");
    } else {
      item.css("left", "61%");
    }
    item.css("top", "84%");
    item= ""
  }
}, 50)
function checkHeights() {
  switch (character) {
    case "bomber":
      return [30, 30]
      break;
    case "giant":
      return [70, 80]
      break;
    case "executioner":
      return [40, 50]
  }
}
