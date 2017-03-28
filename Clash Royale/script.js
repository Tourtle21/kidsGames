var follow = false;
var item;
var img;
var x;
var y;
var offLeft = 465;
var offTop = 810;
$(".card").mousedown(function() {
  follow = true;
  item = $(this);
})
$(document).mouseup(function() {
  follow = false;
  item = "";
})
$(document).mousemove(function(e) {
  x = e.clientX;
  y = e.clientY;
})
setInterval(function() {
  if (follow) {
    console.log(x, y)
    item.css("left", x - offLeft)
    item.css("top", y - offTop);
    if (y <= 730) {
      item.css("background", "url(images/bomberGuy.png)")
      item.css("height", "30px")
      item.css("width", "30px")
      item.css("background-size", "100% 100%")
      offLeft = 415
      offTop = 760
    } else {
      item.css("background", "url(images/bomber.png)")
      item.css("height", "97%")
      item.css("width", "20%")
      item.css("background-size", "100% 100%")
      offLeft = 465
      offTop = 810
    }
  }
}, 50)
