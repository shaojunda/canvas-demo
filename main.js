var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d');

var eraserEnabled = false

autoSetCanvasSize(canvas)

eraser.onclick = function() {
  eraserEnabled = true
  actions.className = 'actions x'
}

brush.onclick = function() {
  eraserEnabled = false
  actions.className = 'actions'
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI*2)
  context.fill()
}

var painting = false
var lastPoint = { x: undefined, y: undefined }

// 特性检测
if(document.body.ontouchstart !== undefined) {
  canvas.ontouchstart = function(event) {
    painting = true
    var x = event.touches[0].clientX
    var y = event.touches[0].clientY

    if(eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      lastPoint = { x: x, y: y }
      drawCircle(x, y, 1)
    }
  }

  canvas.ontouchmove = function(event) {
    if(painting) {
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
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

  canvas.ontouchend = function(event) {
    painting = false
  }
} else {
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
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 10
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
