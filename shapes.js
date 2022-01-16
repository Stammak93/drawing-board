

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
    
    if (squareCreation) {
        
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


shapeFillButton.addEventListener("click",(e) => {

    if(fillShape === "no-fill") {
        fillShape = "fill"
    } else {
        fillShape = "no-fill"
    }
})


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


// Square Stuff

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

createSquareButton.addEventListener("click", (e) => {

    if (squareCreation) {
        squareCreation = false
    
    } else if(!squareCreation && circleCreation || triangleCreation) {
        circleCreation = false
        triangleCreation = false
        squareCreation = true
        enableSquareTriangleInputs()
    
    } else {
        squareCreation = true
        enableSquareTriangleInputs()
    }

})


createCircleButton.addEventListener("click",(e) => {

    if (circleCreation) {
        circleCreation = false
    
    } else if (!circleCreation && squareCreation || triangleCreation) {
        squareCreation = false
        triangleCreation = false
        circleCreation = true
        enableCircleInputs()
    
    } else {
        circleCreation = true
        enableCircleInputs()
    }
})


createTriangleButton.addEventListener("click", (e) => {

    if (triangleCreation) {
        triangleCreation = false
    
    } else if (!triangleCreation && circleCreation || squareCreation) {
        circleCreation = false
        squareCreation = false
        triangleCreation = true
        enableSquareTriangleInputs()
    
    } else {
        triangleCreation = true
        enableSquareTriangleInputs()
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