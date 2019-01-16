var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d');

resetCanvas()

window.onresize = function() {
  resetCanvas()
}


function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI*2)
  context.fill()
}

var painting = false
var lastPoint = { x: undefined, y: undefined }

canvas.onmousedown = function(event) {
  painting = true
  var x = event.clientX
  var y = event.clientY

  if(eraserEnabled) {
    context.clearRect(x-5, y-5, 10, 10)
  } else {
    lastPoint = { x: x, y: y }
    drawCircle(x, y, 1)
  }
}

canvas.onmousemove = function(event) {
  if(painting) {
    var x = event.clientX
    var y = event.clientY
    var newPoint = {x: x, y: y}
    if(eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    }else {
      drawCircle(x, y, 5)
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

  }
}

canvas.onmouseup = function(event) {
  painting = false
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 10
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function resetCanvas() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;

  canvas.width = pageWidth
  canvas.height = pageHeight
}

var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled = !eraserEnabled
}