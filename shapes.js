// I can use ctx.fill() along with buttons that when clicked will return
// the coordinates of the shape created to fill with a specific colour

let shapesContainer = document.querySelector("div.shapes-container")
let xPositionSlider = document.querySelector("input.x-position")
let yPositionSlider = document.querySelector("input.y-position")
let heightSlider = document.querySelector("input.height-slider")
let widthSlider = document.querySelector("input.width-slider")

let xInput = document.querySelector("input.x-value")
let yInput = document.querySelector("input.y-value")
let heightInput = document.querySelector("input.height-value")
let widthInput = document.querySelector("input.width-value")

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

const takeMeasurements = () => {

    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
}


const drawSquare = (x, y, width, height) => {

    if(fillShape) {
        ctx.fillStyle = colourChange.value
        ctx.fillRect(x,y,width,height)
    
    } else {
        ctx.fillStyle = colourChange.value
        ctx.strokeRect(x,y,width,height)
    }
}


const clearArrayForSquareRedraw = () => {

    if (savefile.length > 0) {
        if(fillShape) {
            ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
            savefile = []
        
        } else {
            
            // strokeRect adds extra pixels to the shape around the border
            // this border is hard to erase therefore this thing
            ctx.clearRect(savefile[0]-parseInt(lineWidth.value),savefile[1]-parseInt(lineWidth.value),
            savefile[2] + parseInt(lineWidth.value)+parseInt(lineWidth.value),
            savefile[3] + parseInt(lineWidth.value)+parseInt(lineWidth.value))
            
            savefile = []
        }
    }
}


const xInputCompulsoryFunction = () => {

    if (xInput.value > parseInt(xPositionSlider.max)) {
        xInput.value = xPositionSlider.max
    } else if (xInput.value < 0) {
        xInput.value = 0
    }


    xPositionSlider.value = xInput.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()
    
    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}


const yInputCompulsoryFunction = () => {

    if (yInput.value > parseInt(yPositionSlider.max)) {
        yInput.value = yPositionSlider.max
    } else if (yInput.value < 0) {
        yInput.value = 0
    }


    yPositionSlider.value = yInput.value
    takeMeasurements()


    clearArrayForSquareRedraw()
    
    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}


const widthInputCompulsoryFunction = () => {

    if (widthInput.value > parseInt(widthSlider.max)) {
        widthInput.value = widthSlider.max
    } else if (widthInput.value < 0) {
        widthInput.value = 0
    }


    widthSlider.value = widthInput.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()
    
    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width =  parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
} 


const heighInputCompulsoryFunction = () => {
    
    if (heightInput.value > parseInt(heightSlider.max)) {
        heightInput.value = heightSlider.max
    } else if (heightInput.value < 0) {
        heightInput.value = 0
    }


    heightSlider.value = heightInput.value
    takeMeasurements()

    clearArrayForSquareRedraw()
    
    x = parseInt(xInput.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}


const xPositionSliderCompulsoryFunction = () => {

    xInput.value = xPositionSlider.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}


const yPositionSliderCompulsoryFunction = () => {
    yInput.value = yPositionSlider.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}


const widthSliderCompulsoryFunction = () => {
    
    widthInput.value = widthSlider.value
    takeMeasurements()
    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)

}


const heightSliderCompulsoryFunction = () => {
    
    heightInput.value = heightSlider.value
    takeMeasurements()

    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
}



const createSquare = document.querySelector("button.create-square")
createSquare.addEventListener("click", (e) => {

    xPositionSlider.removeEventListener("change",xPositionSliderCompulsoryFunction)
    yPositionSlider.removeEventListener("change",yPositionSliderCompulsoryFunction)
    heightSlider.removeEventListener("change",heightSliderCompulsoryFunction) 
    widthSlider.removeEventListener("change",widthSliderCompulsoryFunction)
    xInput.removeEventListener("change",xInputCompulsoryFunction)
    yInput.removeEventListener("change",yInputCompulsoryFunction) 
    widthInput.removeEventListener("change",widthInputCompulsoryFunction) 
    heightInput.removeEventListener("change",heighInputCompulsoryFunction)
    
    
    if (!squareCreation && !circleCreation) {
            squareCreation = true
    } else {
        squareCreation = false
    }

    if (squareCreation) {
            
        xInput.addEventListener("change", xInputCompulsoryFunction)
        yInput.addEventListener("change", yInputCompulsoryFunction)
        widthInput.addEventListener("change", widthInputCompulsoryFunction)     
        heightInput.addEventListener("change",heighInputCompulsoryFunction)
        xPositionSlider.addEventListener("change",xPositionSliderCompulsoryFunction)           
        yPositionSlider.addEventListener("change",yPositionSliderCompulsoryFunction)
        widthSlider.addEventListener("change",widthSliderCompulsoryFunction)
        heightSlider.addEventListener("change",heightSliderCompulsoryFunction)

        } else {
            return;
    }
})