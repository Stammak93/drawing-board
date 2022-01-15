// I can use ctx.fill() along with buttons that when clicked will return
// the coordinates of the shape created to fill with a specific colour

let shapesContainer = document.querySelector("div.shapes-container")
let xPositionSlider = document.querySelector("input#x-position")
let yPositionSlider = document.querySelector("input#y-position")
let heightSlider = document.querySelector("input#height-slider")
let widthSlider = document.querySelector("input#width-slider")

let xInput = document.querySelector("input#x-value")
let yInput = document.querySelector("input#y-value")
let heightInput = document.querySelector("input#height-value")
let widthInput = document.querySelector("input#width-value")

let shapeFillButton = document.querySelector("button.fill-shape")
let placeShapeButton = document.querySelector("button.place-shape")
let undoShapeButton = document.querySelector("button.undo-shape")
let createSquareButton = document.querySelector("button.create-square")
let createTriangleButton = document.querySelector("button.create-triangle")
let createCircleButton = document.querySelector("button.create-circle")

xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
heightSlider.max = sketchboard.clientHeight - yPositionSlider.value

xInput.value = xPositionSlider.value
yInput.value = yPositionSlider.value
widthInput.value = widthSlider.value
heightInput.value = heightSlider.value

let x;
let y;
let width;
let height;
fillShape = false
squareCreation = false
circleCreation = false
let savefile = []


shapeFillButton.addEventListener("click",(e) => {

    if(!fillShape) {
        fillShape = true
    } else {
        fillShape = false
    }
})


const resetInputs = () => {

    let inputs = document.querySelectorAll(".tool")

    inputs.forEach((input) => {

        input.value = 50
    })
}


const disableInputs = () => {

    let inputs = document.querySelectorAll(".tool")
    
    if(!squareCreation && !circleCreation) {
        
        inputs.forEach((input) => {
        
            input.disabled = true
        })
    
    } else if (squareCreation) {
        
        inputs.forEach((input) => {
            input.disabled = false
        })
    }
}

disableInputs()


// Square Related stuff

const drawSquare = () => {

    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)

    if(fillShape) {
        ctx.fillStyle = colourChange.value
        ctx.fillRect(x,y,width,height)
    
    } else {
        ctx.fillStyle = colourChange.value
        ctx.strokeRect(x,y,width,height)
    }
}


const saveSquareInfoToTempArray = () => {

    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
}


const clearArrayForSquareRedraw = () => {

    if (savefile.length > 0) { 
        
            // strokeRect adds extra pixels to the shape around the border
            // this border is hard to erase therefore this thing
            ctx.clearRect(savefile[0]-parseInt(lineWidth.value),savefile[1]-parseInt(lineWidth.value),
            savefile[2] + parseInt(lineWidth.value)+parseInt(lineWidth.value),
            savefile[3] + parseInt(lineWidth.value)+parseInt(lineWidth.value))
            savefile = []
    } else {
        return;
    }
}



// adjust sliders accordingly
const takeMeasurementsSquare = () => {

    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
}


// Compulsory functions that need to be passed in as callback function
// in order to remove event listeners.

const xInputCompulsoryFunction = () => {

    if (xInput.value > parseInt(xPositionSlider.max)) {
        xInput.value = xPositionSlider.max
    } else if (xInput.value < 0) {
        xInput.value = 0
    }

    xPositionSlider.value = xInput.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()
    
    saveSquareInfoToTempArray()
    drawSquare()
}


const yInputCompulsoryFunction = () => {

    if (yInput.value > parseInt(yPositionSlider.max)) {
        yInput.value = yPositionSlider.max
    } else if (yInput.value < 0) {
        yInput.value = 0
    }

    yPositionSlider.value = yInput.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()
    
    saveSquareInfoToTempArray()
    drawSquare()
}


const widthInputCompulsoryFunction = () => {

    if (widthInput.value > parseInt(widthSlider.max)) {
        widthInput.value = widthSlider.max
    } else if (widthInput.value < 0) {
        widthInput.value = 0
    }

    widthSlider.value = widthInput.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()
    
    saveSquareInfoToTempArray()
    drawSquare()
} 


const heighInputCompulsoryFunction = () => {
    
    if (heightInput.value > parseInt(heightSlider.max)) {
        heightInput.value = heightSlider.max
    } else if (heightInput.value < 0) {
        heightInput.value = 0
    }

    heightSlider.value = heightInput.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()
    
    saveSquareInfoToTempArray()
    drawSquare()
}


const xPositionSliderCompulsoryFunction = () => {

    xInput.value = xPositionSlider.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()

    saveSquareInfoToTempArray()
    drawSquare()
}


const yPositionSliderCompulsoryFunction = () => {
    
    yInput.value = yPositionSlider.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()

    saveSquareInfoToTempArray()
    drawSquare()
}


const widthSliderCompulsoryFunction = () => {
    
    widthInput.value = widthSlider.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()

    saveSquareInfoToTempArray()
    drawSquare()
}


const heightSliderCompulsoryFunction = () => {
    
    heightInput.value = heightSlider.value
    takeMeasurementsSquare()
    clearArrayForSquareRedraw()

    saveSquareInfoToTempArray()
    drawSquare()
}


createSquareButton.addEventListener("click", (e) => {

    if (!squareCreation && !circleCreation) {
            squareCreation = true
    } else {
        squareCreation = false
    }

    if (squareCreation) {
        
        resetInputs()
        disableInputs()
        saveSquareInfoToTempArray()
        drawSquare()
        
        xInput.addEventListener("change", xInputCompulsoryFunction)
        yInput.addEventListener("change", yInputCompulsoryFunction)
        widthInput.addEventListener("change", widthInputCompulsoryFunction)     
        heightInput.addEventListener("change",heighInputCompulsoryFunction)
        xPositionSlider.addEventListener("change",xPositionSliderCompulsoryFunction)           
        yPositionSlider.addEventListener("change",yPositionSliderCompulsoryFunction)
        widthSlider.addEventListener("change",widthSliderCompulsoryFunction)
        heightSlider.addEventListener("change",heightSliderCompulsoryFunction)

        } else {
            
            resetInputs()
            disableInputs()
            clearArrayForSquareRedraw()
            
            xPositionSlider.removeEventListener("change",xPositionSliderCompulsoryFunction)
            yPositionSlider.removeEventListener("change",yPositionSliderCompulsoryFunction)
            heightSlider.removeEventListener("change",heightSliderCompulsoryFunction) 
            widthSlider.removeEventListener("change",widthSliderCompulsoryFunction)
            xInput.removeEventListener("change",xInputCompulsoryFunction)
            yInput.removeEventListener("change",yInputCompulsoryFunction) 
            widthInput.removeEventListener("change",widthInputCompulsoryFunction) 
            heightInput.removeEventListener("change",heighInputCompulsoryFunction)
    }
})