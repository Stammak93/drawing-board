// sketchboard
// sketchContainer
// ctx

// parseInt(x)-parseInt(lineWidth.value),parseInt(y)-parseInt(lineWidth.value),parseInt(width) + parseInt(lineWidth.value)+parseInt(lineWidth.value),parseInt(height) + parseInt(lineWidth.value)+parseInt(lineWidth.value)

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



const drawSquare = (x, y, width, height) => {

    //ctx.strokeRect(x, y, width, height)
    ctx.fillStyle = colourChange.value
    ctx.fillRect(x,y,width,height)
}

// Numerical Inputs

xInput.value = xPositionSlider.value
yInput.value = yPositionSlider.value
widthInput.value = widthSlider.value
heightInput.value = heightSlider.value



xInput.addEventListener("change", (e) => {

    if (xInput.value > parseInt(xPositionSlider.max)) {
        xInput.value = xPositionSlider.max
    } else if (xInput.value < 0) {
        xInput.value = 0
    }


    xPositionSlider.value = xInput.value
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }
    
    let x = e.target.value
    let y = yInput.value
    let width = widthInput.value
    let height = heightInput.value
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
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value

    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }
    
    let x = xInput.value
    let y = e.target.value
    let width = widthInput.value
    let height = heightInput.value
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
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }
    
    let x = xInput.value
    let y = yInput.value
    let width =  e.target.value
    let height = heightInput.value
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
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value

    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }
    
    let x = xInput.value
    let y = yInput.value
    let width = widthInput.value
    let height = e.target.value
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


// Sliders

xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
heightSlider.max = sketchboard.clientHeight - yPositionSlider.value


xPositionSlider.addEventListener("change", (e) => {
    

    xInput.value = xPositionSlider.value
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }

    let x = e.target.value
    let y = yPositionSlider.value
    let width = widthSlider.value
    let height = heightSlider.value
    savefile.push(parseInt(x),parseInt(y),parseInt(width),parseInt(height))
    drawSquare(x,y,width,height)
})


yPositionSlider.addEventListener("change", (e) => {

    
    yInput.value = yPositionSlider.value
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value

    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }

    let x = xPositionSlider.value
    let y = e.target.value
    let width = widthSlider.value
    let height = heightSlider.value
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


widthSlider.addEventListener("change", (e) => {

    
    widthInput.value = widthSlider.value
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value
    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }

    let x = xPositionSlider.value
    let y = yPositionSlider.value
    let width = e.target.value
    let height = heightSlider.value
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})


heightSlider.addEventListener("change", (e) => {

    
    heightInput.value = heightSlider.value
    xPositionSlider.max = sketchboard.clientWidth - widthSlider.value
    yPositionSlider.max = sketchboard.clientHeight - heightSlider.value
    widthSlider.max = sketchboard.clientWidth - xPositionSlider.value
    heightSlider.max = sketchboard.clientHeight - yPositionSlider.value

    
    if (savefile.length > 0) {
        ctx.clearRect(savefile[0],savefile[1],savefile[2],savefile[3])
        savefile.splice(0,4)
    }

    let x = xPositionSlider.value
    let y = yPositionSlider.value
    let width = widthSlider.value
    let height = e.target.value
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})