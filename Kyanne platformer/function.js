var platform = 0
var deleted = 0;

div = document.createElement("div")
div.id = "character"
style(div, 20, 20, "maroon", 0, 0)
var character = div;
append(div)

// 0
div = document.createElement("div")
div.className = "platform"
style(div, screenHeight, 20, "purple", 0, 300)
append(div);

// 1 button 0
div = document.createElement("div")
div.className = "platform button"
style(div, 10, 10, "black", screenHeight - 10, 250)
append(div);

// 2
div = document.createElement("div")
div.className = "platform"
style(div, 100, 20, "purple", screenHeight - 100, 400)
append(div);

// 3 button 1
div = document.createElement("div")
div.className = "platform button"
style(div, 10, 10, "black", screenHeight - 200, 320)
append(div);

//4
div = document.createElement("div")
div.className = "platform"
style(div, 20, 200, "purple", screenHeight - 100, 420)
append(div);

//5
div = document.createElement("div")
div.className = "platform"
style(div, 100, 20, "purple", screenHeight - 200, 600)
append(div);

//6
div = document.createElement("div")
div.className = "platform"
style(div, 20, 200, "purple", screenHeight - 200, 620)
append(div);

//7
div = document.createElement("div")
div.className = "platform"
style(div, 100, 20, "purple", screenHeight - 300, 800)
append(div);

//8
div = document.createElement("div")
div.className = "platform"
style(div, 20, 400, "purple", screenHeight - 300, 820)
append(div);

//9
div = document.createElement("div")
div.className = "platform"
style(div, 100, 20, "purple", screenHeight - 400, 1000)
append(div);

//10
div = document.createElement("div")
div.className = "platform"
style(div, 100, 20, "purple", screenHeight - 400, 1000)
append(div);





checkTopOf("button")

function hitTop(block, number){
  if (block == "button" && number==0 && platform==0) {
    remove(document.getElementsByClassName("platform")[platform - deleted]);
    platform=1;
    deleted += 1;
  }
  if (block == "button" && number==1 && platform==1) {

  }
}




//style(item, height, width, background, posTop, left)
