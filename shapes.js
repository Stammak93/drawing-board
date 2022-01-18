
let shapesContainer = document.querySelector("div.shapes-container")
let heightSlider = document.querySelector("input#height-slider")
let widthSlider = document.querySelector("input#width-slider")
let heightInput = document.querySelector("input#height-value")
let widthInput = document.querySelector("input#width-value")

let shapeFillButton = document.querySelector("button.fill-shape")
let undoShapeButton = document.querySelector("button.undo-shape")
let createSquareButton = document.querySelector("button.create-square")
let createTriangleButton = document.querySelector("button.create-triangle")
let createCircleButton = document.querySelector("button.create-circle")

widthSlider.max = sketchboard.clientWidth
heightSlider.max = sketchboard.clientHeight
widthInput.value = widthSlider.value
heightInput.value = heightSlider.value


let fillShape = "no-fill"
let squareCreation = false
let circleCreation = false
let triangleCreation = false
let shapeArray = []


const disableInputs = () => {

    let inputs = document.querySelectorAll(".tool")
      
    inputs.forEach((input) => { 
        input.disabled = true
    })
}

// Call to set initial page condition
disableInputs()


const resetInputs = () => {

    let inputs = document.querySelectorAll(".tool")

    inputs.forEach((input) => {

        input.value = 50
    })
}


const enableSquareTriangleInputs = () => {
    
    let inputs = document.querySelectorAll(".tool")
    
    if (squareCreation || triangleCreation) {
        
        document.querySelector("label[for='width-slider']").textContent = "Width"
        
        inputs.forEach((input) => {
            input.disabled = false
        })

    }
}


const enableCircleInputs = () => {

    let inputs = document.querySelectorAll(".tool")
    
    if (circleCreation) {
        document.querySelector("label[for='width-slider']").textContent = "Radius"
        
        for(let i=0; i < 2; i++) {
            inputs[i].disabled = false
        }
    }
}


const drawShapes = (shapeArray) => {

    for (let i=0; i < shapeArray.length; i+=8) {

        if(shapeArray[i] === "square") {
            drawSquare(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7])            
        
        } else if (shapeArray[i] === "circle") {

            drawCircle(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7])

        } else {
            drawTriangle(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7])
        }
    }

}


const undoShapes = () => {

    if(shapeArray.length === 0) {
        return;
    }

    ctx.clearRect(0,0,sketchboard.width,sketchboard.height)
    shapeArray.splice(shapeArray.length-8,8)
}

undoShapeButton.addEventListener("click",(e) => {

    undoShapes(shapeArray)
    drawPaths(pathArray)
    drawShapes(shapeArray)
})


shapeFillButton.addEventListener("click",(e) => {

    if(fillShape === "no-fill") {
        fillShape = "fill"
        e.target.classList.add("button-toggled")
    } else {
        fillShape = "no-fill"
        e.target.classList.remove("button-toggled")
    }
})


// Triangle Related stuff

const drawTriangle = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue) => {

    ctx.lineWidth = lineW

    let triangleWidth = Math.floor(widthValue/2)
    
    if(fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.moveTo(xValue,yValue)
        ctx.lineTo(xValue-triangleWidth, yValue+heightValue)
        ctx.lineTo(xValue+triangleWidth, yValue+heightValue)
        ctx.fill()

    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.moveTo(xValue,yValue)
        ctx.lineTo(xValue-triangleWidth, yValue+heightValue)
        ctx.lineTo(xValue+triangleWidth, yValue+heightValue)
        ctx.closePath()
        ctx.stroke()
    }
}


const saveTriangleInfoToArray = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue) => {

    shapeArray.push("triangle",fillShape,lineW,colour,xValue,yValue,widthValue,heightValue)
}


// Circle Related Stuff

const drawCircle = (fillShape,lineW,colour,xValue,yValue,radiusValue,sAngle=0) => {

    ctx.lineWidth = lineW
    
    if (fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.arc(xValue,yValue,radiusValue,sAngle,Math.PI*2)
        ctx.fill()
        ctx.stroke()
    
    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.arc(xValue,yValue,radiusValue,sAngle,Math.PI*2)
        ctx.stroke()
    }
}


const saveCircleInfoToArray = (fillShape,lineW,colour,xValue,yValue,radiusValue,sAngle=0) => {

    shapeArray.push("circle",fillShape,lineW,colour,xValue,yValue,radiusValue,sAngle=0)
}


// Square Related Stuff

const drawSquare = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue) => {

    ctx.lineWidth = lineW
    
    if(fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.fillRect(xValue,yValue,widthValue,heightValue)
    
    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.strokeRect(xValue,yValue,widthValue,heightValue)
    }
}


const saveSquareInfoToArray = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue) => {

    shapeArray.push("square",fillShape,lineW,colour,xValue,yValue,widthValue,heightValue)
}


// Shape Creation Buttons

const buttonPressedHighlight = () => {
    
    if(squareCreation) {
        createSquareButton.classList.add("button-toggled")
    } else {
        createSquareButton.classList.remove("button-toggled")
    }

    if(triangleCreation) {
        createTriangleButton.classList.add("button-toggled")
    } else {
        createTriangleButton.classList.remove("button-toggled")
    }

    if(circleCreation) {
        createCircleButton.classList.add("button-toggled")
    } else {
        createCircleButton.classList.remove("button-toggled")
    }
}


createSquareButton.addEventListener("click", (e) => {

    if (squareCreation) {
        squareCreation = false
        disableInputs()
        buttonPressedHighlight()
    } else if(!squareCreation && circleCreation || triangleCreation) {
        disableInputs()
        circleCreation = false
        triangleCreation = false
        squareCreation = true
        enableSquareTriangleInputs()
        buttonPressedHighlight()
    } else {
        squareCreation = true
        enableSquareTriangleInputs()
        buttonPressedHighlight()
    }

})


createCircleButton.addEventListener("click",(e) => {

    if (circleCreation) {
        circleCreation = false
        disableInputs()
        buttonPressedHighlight()
    } else if (!circleCreation && squareCreation || triangleCreation) {
        disableInputs()
        squareCreation = false
        triangleCreation = false
        circleCreation = true
        enableCircleInputs()
        buttonPressedHighlight()
    } else {
        circleCreation = true
        enableCircleInputs()
        buttonPressedHighlight()
    }
})


createTriangleButton.addEventListener("click", (e) => {

    if (triangleCreation) {
        triangleCreation = false
        disableInputs()
        buttonPressedHighlight()
    } else if (!triangleCreation && circleCreation || squareCreation) {
        disableInputs()
        circleCreation = false
        squareCreation = false
        triangleCreation = true
        enableSquareTriangleInputs()
        buttonPressedHighlight()
    } else {
        triangleCreation = true
        enableSquareTriangleInputs()
        buttonPressedHighlight()
    }
})


// Input Listeners

const widthInputFunction = () => {

    if (widthInput.value > parseInt(widthSlider.max)) {
        widthInput.value = widthSlider.max
    
    } else if (widthInput.value < 0) {
        widthInput.value = 5
    }

    widthSlider.value = widthInput.value
    takeMeasurements()
}


const heightInputFunction = () => {
    
    if (heightInput.value > parseInt(heightSlider.max)) {
        heightInput.value = heightSlider.max
    
    } else if (heightInput.value < 0) {
        heightInput.value = 5
    }

    heightSlider.value = heightInput.value
}


const widthSliderFunction = () => {

    widthInput.value = widthSlider.value
}


const heightSliderFunction = () => {

    heightInput.value = heightSlider.value
}


widthSlider.addEventListener("change",widthSliderFunction)
heightSlider.addEventListener("change",heightSliderFunction)
widthInput.addEventListener("change", widthInputFunction)
heightInput.addEventListener("change", heightInputFunction)