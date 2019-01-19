var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d');

var eraserEnabled = false

var lineWidth = 3

autoSetCanvasSize(canvas)

thin.onclick = function() {
  lineWidth = 3
}

thick.onclick = function() {
  lineWidth = 6
}

red.onclick = function() {
  context.fillStyle = "red"
  context.strokeStyle = "red"
  red.classList.add("active")
  green.classList.remove("active")
  blue.classList.remove("active")
  black.classList.remove("active")
}
black.onclick = function() {
  context.fillStyle = "black"
  context.strokeStyle = "black"
  black.classList.add("active")
  green.classList.remove("active")
  blue.classList.remove("active")
  red.classList.remove("active")
}
green.onclick = function() {
  context.fillStyle = "green"
  context.strokeStyle = "green"
  green.classList.add("active")
  black.classList.remove("active")
  blue.classList.remove("active")
  red.classList.remove("active")
}
blue.onclick = function() {
  context.fillStyle = "blue"
  context.strokeStyle = "blue"
  blue.classList.add("active")
  green.classList.remove("active")
  black.classList.remove("active")
  red.classList.remove("active")
}

eraser.onclick = function() {
  eraserEnabled = true
  eraser.classList.add("active")
  pen.classList.remove("active")
}

pen.onclick = function() {
  eraserEnabled = false
  pen.classList.add("active")
  eraser.classList.remove("active")
}

clear.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

save.onclick = function() {
  var url = canvas.toDataURL("image/png")
  var a = document.createElement("a")
  document.body.appendChild(a)
  a.href = url
  a.download = Date.now()
  a.click()
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
      context.clearRect(x-5, y-5, lineWidth * 1.5, lineWidth * 1.5)
    } else {
      lastPoint = { x: x, y: y }
      drawCircle(x, y, lineWidth)
    }
  }

  canvas.ontouchmove = function(event) {
    if(painting) {
      var x = event.touches[0].clientX
      var y = event.touches[0].clientY
      var newPoint = {x: x, y: y}
      if(eraserEnabled) {
        context.clearRect(x-5, y-5, lineWidth * 1.5, lineWidth * 1.5)
      }else {
        drawCircle(x, y, lineWidth)
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
      context.clearRect(x-5, y-5, lineWidth * 1.5, lineWidth * 1.5)
    } else {
      lastPoint = { x: x, y: y }
      drawCircle(x, y, lineWidth)
    }
  }

  canvas.onmousemove = function(event) {
    if(painting) {
      var x = event.clientX
      var y = event.clientY
      var newPoint = {x: x, y: y}
      if(eraserEnabled) {
        context.clearRect(x-5, y-5, lineWidth * 1.5, lineWidth * 1.5)
      }else {
        drawCircle(x, y, lineWidth)
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
  context.lineWidth = lineWidth * 2
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
