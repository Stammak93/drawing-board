// I can use ctx.fill() along with buttons that when clicked will return
// the coordinates of the shape created to fill with a specific colour

let shapesContainer = document.querySelector("div.shapes-container")
let xPositionSlider = document.querySelector("input.x-position")
let yPositionSlider = document.querySelector("input.y-position")
let heightSlider = document.querySelector("input.height-slider")
let widthSlider = document.querySelector("input.width-slider")
let savefile = []

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
fillSquare = false


const takeMeasurements = () => {

    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
}

// Numerical Input Listeners

// all x,y,width,height values need to be numbers
// they get passed into functions as strings and
// that makes Javascript think that 83 is also 830
// or 1020 less than 103


xInput.addEventListener("change", (e) => {

    if (xInput.value > parseInt(xPositionSlider.max)) {
        xInput.value = xPositionSlider.max
    } else if (xInput.value < 0) {
        xInput.value = 0
    }


    xPositionSlider.value = xInput.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()
    
    x = parseInt(e.target.value)
    y = parseInt(yInput.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)

})


yInput.addEventListener("change", (e) => {
    
    if (yInput.value > parseInt(yPositionSlider.max)) {
        yInput.value = yPositionSlider.max
    } else if (yInput.value < 0) {
        yInput.value = 0
    }


    yPositionSlider.value = yInput.value
    takeMeasurements()


    clearArrayForSquareRedraw()
    
    x = parseInt(xInput.value)
    y = parseInt(e.target.value)
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


widthInput.addEventListener("change", (e) => {
    
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
    width =  parseInt(e.target.value)
    height = parseInt(heightInput.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


heightInput.addEventListener("change", (e) => {
    
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
    height = parseInt(e.target.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


// Slider Listeners


xPositionSlider.addEventListener("change", (e) => {
    

    xInput.value = xPositionSlider.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()

    x = parseInt(e.target.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


yPositionSlider.addEventListener("change", (e) => {

    
    yInput.value = yPositionSlider.value
    takeMeasurements()

    
    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(e.target.value)
    width = parseInt(widthSlider.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


widthSlider.addEventListener("change", (e) => {

    
    widthInput.value = widthSlider.value
    takeMeasurements()


    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(e.target.value)
    height = parseInt(heightSlider.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


heightSlider.addEventListener("change", (e) => {

    
    heightInput.value = heightSlider.value
    takeMeasurements()

    clearArrayForSquareRedraw()

    x = parseInt(xPositionSlider.value)
    y = parseInt(yPositionSlider.value)
    width = parseInt(widthSlider.value)
    height = parseInt(e.target.value)
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})



const drawSquare = (x, y, width, height) => {

    if(fillSquare) {
        //ctx.beginPath()
        ctx.fillStyle = colourChange.value
        ctx.fillRect(x,y,width,height)
    
    } else {
        //ctx.beginPath()
        ctx.fillStyle = colourChange.value
        ctx.strokeRect(x,y,width,height)
    }
}


const clearArrayForSquareRedraw = () => {

    if (savefile.length > 0) {
        if(fillSquare) {
            ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
            savefile = []
        } else {
            // strokeRect adds extra pixels to the shape around the border
            // this border is hard to erase therefore this thing
            console.log(savefile)
            ctx.clearRect(savefile[0]-parseInt(lineWidth.value),savefile[1]-parseInt(lineWidth.value),
            savefile[2] + parseInt(lineWidth.value)+parseInt(lineWidth.value),
            savefile[3] + parseInt(lineWidth.value)+parseInt(lineWidth.value))
            
            savefile = []
        }
    }
}



const drawCircle = (x,y,radius,sAngle=0,eAngle) => {

    //if(fillCircle) {


    //}

}