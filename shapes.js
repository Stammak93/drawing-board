// sketchboard
// sketchContainer
// ctx
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

xInput.value = xPositionSlider.value
yInput.value = yPositionSlider.value
widthInput.value = widthSlider.value
heightInput.value = heightSlider.value


xInput.addEventListener("change", (e) => {
    
    if (xInput.value > sketchboard.clientWidth) {
        xInput.value = sketchboard.clientWidth
    } else if (xInput.value < 0) {
        xInput.value = 0
    }
})


yInput.addEventListener("change", (e) => {
    
    if (yInput.value > sketchboard.clientWidth) {
        yInput.value = sketchboard.clientWidth
    } else if (yInput.value < 0) {
        yInput.value = 0
    }
})


widthInput.addEventListener("change", (e) => {
    
    if (widthInput.value > sketchboard.clientWidth) {
        widthInput.value = sketchboard.clientWidth
    } else if (widthInput.value < 0) {
        widthInput.value = 0
    }
})


heightInput.addEventListener("change", (e) => {
    
    if (heightInput.value > sketchboard.clientWidth) {
        heightInput.value = sketchboard.clientWidth
    } else if (heightInput.value < 0) {
        heightInput.value = 0
    }
})



const drawSquare = (x, y, width, height) => {

    ctx.fillRect(x, y, width, height)
}



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
    let height = heightSlider.value
    let width = widthSlider.value
    savefile.push(x,y,width,height)
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
    let height = heightSlider.value
    let width = widthSlider.value
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
    let height = e.target.value
    let width = widthSlider.value
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
    let height = heightSlider.value
    let width = e.target.value
    savefile.push(x,y,width,height)
    drawSquare(x,y,width,height)
})