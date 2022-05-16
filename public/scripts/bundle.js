/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/drawing.js ***!
  \************************/
// global variables for drawing on canvas and tool container two
var sketchboardContainer = document.querySelector("div.sketch-container");
var sketchboard = document.querySelector("canvas.sketch");
var ctx = sketchboard.getContext("2d");
sketchboard.width = sketchboard.clientWidth;
sketchboard.height = sketchboard.clientHeight;
var colourChange = document.querySelector("#colour");
var lineWidth = document.querySelector("#line-width");
ctx.strokeStyle = colourChange.value;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
var isSketching = false;
var xyPath = [];
var pathArray = []; // global variables for the shapes functions, tool container one and event listeners

var shapesContainer = document.querySelector("div.shapes-container");
var heightSlider = document.querySelector("input#height-slider");
var widthSlider = document.querySelector("input#width-slider");
var heightInput = document.querySelector("input#height-value");
var widthInput = document.querySelector("input#width-value");
var shapeFillButton = document.querySelector("button.fill-shape");
var undoShapeButton = document.querySelector("button.undo-shape");
var createSquareButton = document.querySelector("button.create-square");
var createTriangleButton = document.querySelector("button.create-triangle");
var createCircleButton = document.querySelector("button.create-circle");
widthSlider.max = sketchboard.clientWidth;
heightSlider.max = sketchboard.clientHeight;
widthInput.value = widthSlider.value;
heightInput.value = heightSlider.value;
squareCreation = false;
circleCreation = false;
triangleCreation = false;
fillShape = "no-fill";
shapeArray = [];
var x;
var y;
var width;
var height; // global variables for save button and transition effect of toolbars at smaller viewports

var toolbarOne = false;
var toolbarTwo = false;
var saveBtn = false;
var toggleOne = document.querySelector("#tl-bar-1");
var toggleTwo = document.querySelector("#tl-bar-2");
var toggleSave = document.querySelector("#sv-btn-toggle");
var toolOneCont = document.querySelector(".toolbar-container-one");
var toolTwoCont = document.querySelector(".toolbar-container-two");
var saveBtnCont = document.querySelector(".save-btn"); // used on mousemove event listener

var sketching = function sketching(e) {
  if (!isSketching) {
    sketchboard.style.cursor = "default";
    return;
  } // this is here because if I mouse off the canvas
  // it never registers that I stopped drawing
  // and continues as soon as I mouse over again


  if (e.buttons !== 1) {
    isSketching = false;
    storeArray();
    return;
  }

  sketchboard.style.cursor = "url('images/brush.png'),auto";
  xyPath.push(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop);
  ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop);
  ctx.stroke();
};

var disableInputs = function disableInputs() {
  var inputs = document.querySelectorAll(".tool");
  inputs.forEach(function (input) {
    input.disabled = true;
  });
};

var resetInputs = function resetInputs() {
  var inputs = document.querySelectorAll(".tool");
  inputs.forEach(function (input) {
    input.value = 50;
  });
};

var enableSquareTriangleInputs = function enableSquareTriangleInputs() {
  var inputs = document.querySelectorAll(".tool");

  if (squareCreation || triangleCreation) {
    document.querySelector("label[for='width-slider']").textContent = "Width";
    inputs.forEach(function (input) {
      input.disabled = false;
    });
  }
};

var enableCircleInputs = function enableCircleInputs() {
  var inputs = document.querySelectorAll(".tool");

  if (circleCreation) {
    document.querySelector("label[for='width-slider']").textContent = "Radius";

    for (var i = 0; i < 2; i++) {
      inputs[i].disabled = false;
    }
  }
};

var drawShapes = function drawShapes(shapeArray) {
  for (var i = 0; i < shapeArray.length; i += 8) {
    if (shapeArray[i] === "square") {
      drawSquare(shapeArray[i + 1], shapeArray[i + 2], shapeArray[i + 3], shapeArray[i + 4], shapeArray[i + 5], shapeArray[i + 6], shapeArray[i + 7]);
    } else if (shapeArray[i] === "circle") {
      drawCircle(shapeArray[i + 1], shapeArray[i + 2], shapeArray[i + 3], shapeArray[i + 4], shapeArray[i + 5], shapeArray[i + 6], shapeArray[i + 7]);
    } else {
      drawTriangle(shapeArray[i + 1], shapeArray[i + 2], shapeArray[i + 3], shapeArray[i + 4], shapeArray[i + 5], shapeArray[i + 6], shapeArray[i + 7]);
    }
  }
};

var undoShapes = function undoShapes() {
  if (shapeArray.length === 0) {
    return;
  }

  ctx.clearRect(0, 0, sketchboard.width, sketchboard.height);
  shapeArray.splice(shapeArray.length - 8, 8);
}; // Triangle Related stuff


var drawTriangle = function drawTriangle(fillShape, lineW, colour, xValue, yValue, widthValue, heightValue) {
  ctx.lineWidth = lineW;
  var triangleWidth = Math.floor(widthValue / 2);

  if (fillShape === "fill") {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(xValue, yValue);
    ctx.lineTo(xValue - triangleWidth, yValue + heightValue);
    ctx.lineTo(xValue + triangleWidth, yValue + heightValue);
    ctx.fill();
  } else {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.moveTo(xValue, yValue);
    ctx.lineTo(xValue - triangleWidth, yValue + heightValue);
    ctx.lineTo(xValue + triangleWidth, yValue + heightValue);
    ctx.closePath();
    ctx.stroke();
  }
};

var saveTriangleInfoToArray = function saveTriangleInfoToArray(fillShape, lineW, colour, xValue, yValue, widthValue, heightValue) {
  shapeArray.push("triangle", fillShape, lineW, colour, xValue, yValue, widthValue, heightValue);
}; // Circle Related Stuff


var drawCircle = function drawCircle(fillShape, lineW, colour, xValue, yValue, radiusValue) {
  var sAngle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  ctx.lineWidth = lineW;

  if (fillShape === "fill") {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(xValue, yValue, radiusValue, sAngle, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.arc(xValue, yValue, radiusValue, sAngle, Math.PI * 2);
    ctx.stroke();
  }
};

var saveCircleInfoToArray = function saveCircleInfoToArray(fillShape, lineW, colour, xValue, yValue, radiusValue) {
  var sAngle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  shapeArray.push("circle", fillShape, lineW, colour, xValue, yValue, radiusValue, sAngle = 0);
}; // Square Related Stuff


var drawSquare = function drawSquare(fillShape, lineW, colour, xValue, yValue, widthValue, heightValue) {
  ctx.lineWidth = lineW;

  if (fillShape === "fill") {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.fillRect(xValue, yValue, widthValue, heightValue);
  } else {
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.strokeRect(xValue, yValue, widthValue, heightValue);
  }
};

var saveSquareInfoToArray = function saveSquareInfoToArray(fillShape, lineW, colour, xValue, yValue, widthValue, heightValue) {
  shapeArray.push("square", fillShape, lineW, colour, xValue, yValue, widthValue, heightValue);
}; // Shape Creation Buttons


var buttonPressedHighlight = function buttonPressedHighlight() {
  if (squareCreation) {
    createSquareButton.classList.add("button-toggled");
  } else {
    createSquareButton.classList.remove("button-toggled");
  }

  if (triangleCreation) {
    createTriangleButton.classList.add("button-toggled");
  } else {
    createTriangleButton.classList.remove("button-toggled");
  }

  if (circleCreation) {
    createCircleButton.classList.add("button-toggled");
  } else {
    createCircleButton.classList.remove("button-toggled");
  }
}; // Input Listener Functions


var widthInputFunction = function widthInputFunction() {
  if (widthInput.value > parseInt(widthSlider.max)) {
    widthInput.value = widthSlider.max;
  } else if (widthInput.value < 0) {
    widthInput.value = 5;
  }

  widthSlider.value = widthInput.value;
  takeMeasurements();
};

var heightInputFunction = function heightInputFunction() {
  if (heightInput.value > parseInt(heightSlider.max)) {
    heightInput.value = heightSlider.max;
  } else if (heightInput.value < 0) {
    heightInput.value = 5;
  }

  heightSlider.value = heightInput.value;
};

var widthSliderFunction = function widthSliderFunction() {
  widthInput.value = widthSlider.value;
};

var heightSliderFunction = function heightSliderFunction() {
  heightInput.value = heightSlider.value;
}; // Save function


var downloadCanvasImage = function downloadCanvasImage(data) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "untitled.png";
  var aTag = document.createElement("a");
  aTag.href = data;
  aTag.download = filename;
  document.body.appendChild(aTag);
  aTag.click();
};

var toggleFunction = function toggleFunction() {
  if (toolbarOne) {
    toolOneCont.classList.add("toolbar-el-transition");
  } else {
    toolOneCont.classList.remove("toolbar-el-transition");
  }

  if (toolbarTwo) {
    toolTwoCont.classList.add("toolbar-el-transition");
  } else {
    toolTwoCont.classList.remove("toolbar-el-transition");
  }

  if (saveBtn) {
    saveBtnCont.classList.add("toolbar-el-transition");
  } else {
    saveBtnCont.classList.remove("toolbar-el-transition");
  }
}; // Call to set initial page condition


disableInputs();
window.addEventListener("resize", function (e) {
  sketchboard.width = sketchboard.clientWidth;
  sketchboard.height = sketchboard.clientHeight;
  toolOneCont.classList.remove("toolbar-el-transition");
  toolTwoCont.classList.remove("toolbar-el-transition");
  saveBtnCont.classList.remove("toolbar-el-transition");
  toolbarOne = false;
  toolbarTwo = false;
  saveBtn = false;
  ctx.strokeStyle = colourChange.value;
  ctx.lineWidth = lineWidth.value;
  ctx.lineCap = "round";
  drawPaths(pathArray);
  drawShapes(shapeArray);
}); // The idea is to store arrays of paths and recreate them
// when the user refreshes the page.

var drawPaths = function drawPaths(pathArray) {
  if (pathArray.length === 0) {
    return;
  }

  for (var i = 0; i < pathArray.length; i += 3) {
    ctx.beginPath();
    ctx.strokeStyle = pathArray[i];
    ctx.lineWidth = pathArray[i + 1];

    for (var j = 0; j < pathArray[i + 2].length; j += 2) {
      ctx.lineTo(pathArray[i + 2][j], pathArray[i + 2][j + 1]);
      ctx.stroke();
    }
  }
}; // undo step by step


var undoDrawing = function undoDrawing(pathArray) {
  if (pathArray.length === 0) {
    return;
  }

  ctx.clearRect(0, 0, sketchboard.width, sketchboard.height);
  pathArray.splice(pathArray.length - 3, 3);
}; // store array to be accessed in steps
// every time you let go of mouse button
// an array is stored inside a bigger array


var storeArray = function storeArray() {
  pathArray.push(colourChange.value, lineWidth.value, xyPath);
  xyPath = [];
};

colourChange.addEventListener("change", function (e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
lineWidth.addEventListener("change", function (e) {
  if (e.target.value > 60) {
    e.target.value = 60;
  }

  if (e.target.value < 1) {
    e.target.value = 1;
  }

  ctx.lineWidth = e.target.value;
});
document.querySelector("#clear-canvas").addEventListener("click", function (e) {
  isSketching = false;
  ctx.clearRect(0, 0, sketchboard.width, sketchboard.height);
  pathArray = [];
  shapeArray = [];
});
document.querySelector("#undo-change").addEventListener("click", function (e) {
  undoDrawing(pathArray);
  drawPaths(pathArray);
  drawShapes(shapeArray);
  ctx.strokeStyle = colourChange.value;
  ctx.lineWidth = lineWidth.value;
});
sketchboard.addEventListener("mousedown", function (e) {
  x = e.clientX - sketchboard.offsetLeft;
  y = e.clientY - sketchboard.offsetTop; // width works as radius for circle

  width = parseInt(widthInput.value);
  height = parseInt(heightInput.value);
  var linew = lineWidth.value;
  var colour = colourChange.value;

  if (squareCreation) {
    isSketching = false;
    drawSquare(fillShape, linew, colour, x, y, width, height);
    saveSquareInfoToArray(fillShape, linew, colour, x, y, width, height);
  } else if (circleCreation) {
    isSketching = false;
    drawCircle(fillShape, linew, colour, x, y, width, 0);
    saveCircleInfoToArray(fillShape, linew, colour, x, y, width, 0);
  } else if (triangleCreation) {
    isSketching = false;
    drawTriangle(fillShape, linew, colour, x, y, width, height);
    saveTriangleInfoToArray(fillShape, linew, colour, x, y, width, height);
  } else {
    isSketching = true;
    ctx.lineCap = "round";
    ctx.beginPath();
  }
});
sketchboard.addEventListener("mouseup", function (e) {
  if (squareCreation || triangleCreation || circleCreation) {
    return;
  } else {
    isSketching = false;
    storeArray();
  }
});
sketchboard.addEventListener("mousemove", sketching);
undoShapeButton.addEventListener("click", function (e) {
  undoShapes(shapeArray);
  drawPaths(pathArray);
  drawShapes(shapeArray);
});
shapeFillButton.addEventListener("click", function (e) {
  if (fillShape === "no-fill") {
    fillShape = "fill";
    e.target.classList.add("button-toggled");
  } else {
    fillShape = "no-fill";
    e.target.classList.remove("button-toggled");
  }
});
createSquareButton.addEventListener("click", function (e) {
  if (squareCreation) {
    squareCreation = false;
    disableInputs();
    buttonPressedHighlight();
  } else if (!squareCreation && circleCreation || triangleCreation) {
    disableInputs();
    circleCreation = false;
    triangleCreation = false;
    squareCreation = true;
    enableSquareTriangleInputs();
    buttonPressedHighlight();
  } else {
    squareCreation = true;
    enableSquareTriangleInputs();
    buttonPressedHighlight();
  }
});
createCircleButton.addEventListener("click", function (e) {
  if (circleCreation) {
    circleCreation = false;
    disableInputs();
    buttonPressedHighlight();
  } else if (!circleCreation && squareCreation || triangleCreation) {
    disableInputs();
    squareCreation = false;
    triangleCreation = false;
    circleCreation = true;
    enableCircleInputs();
    buttonPressedHighlight();
  } else {
    circleCreation = true;
    enableCircleInputs();
    buttonPressedHighlight();
  }
});
createTriangleButton.addEventListener("click", function (e) {
  if (triangleCreation) {
    triangleCreation = false;
    disableInputs();
    buttonPressedHighlight();
  } else if (!triangleCreation && circleCreation || squareCreation) {
    disableInputs();
    circleCreation = false;
    squareCreation = false;
    triangleCreation = true;
    enableSquareTriangleInputs();
    buttonPressedHighlight();
  } else {
    triangleCreation = true;
    enableSquareTriangleInputs();
    buttonPressedHighlight();
  }
});
widthSlider.addEventListener("change", widthSliderFunction);
heightSlider.addEventListener("change", heightSliderFunction);
widthInput.addEventListener("change", widthInputFunction);
heightInput.addEventListener("change", heightInputFunction);
document.querySelector("button#save-as").addEventListener("click", function (e) {
  var data = sketchboard.toDataURL("image/png", 1);
  downloadCanvasImage(data);
});
toggleOne.addEventListener("click", function (e) {
  if (toolbarOne) {
    toolbarOne = false;
    toggleFunction();
  } else if (!toolbarOne && toolbarTwo || saveBtn) {
    toolbarOne = true;
    toolbarTwo = false;
    saveBtn = false;
    toggleFunction();
  } else {
    toolbarOne = true;
    toggleFunction();
  }
});
toggleTwo.addEventListener("click", function (e) {
  if (toolbarTwo) {
    toolbarTwo = false;
    toggleFunction();
  } else if (!toolbarTwo && toolbarOne || saveBtn) {
    toolbarOne = false;
    toolbarTwo = true;
    saveBtn = false;
    toggleFunction();
  } else {
    toolbarTwo = true;
    toggleFunction();
  }
});
toggleSave.addEventListener("click", function (e) {
  if (saveBtn) {
    saveBtn = false;
    toggleFunction();
  } else if (!saveBtn && toolbarOne || toolbarTwo) {
    toolbarOne = false;
    toolbarTwo = false;
    saveBtn = true;
    toggleFunction();
  } else {
    saveBtn = true;
    toggleFunction();
  }
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map