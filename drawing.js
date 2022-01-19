//################################################################
// Sketchboard stuff

let sketchboardContainer = document.querySelector("div.sketch-container")
let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")

sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight
let colourChange = document.querySelector("#colour")
let lineWidth = document.querySelector("#line-width")
ctx.strokeStyle = colourChange.value // initial value on page load
ctx.lineWidth = lineWidth.value // initial value on page load
ctx.lineCap = "round"

let isSketching = false
let xyPath = []
let pathArray = []


window.addEventListener("resize",(e) => {

    sketchboard.width = sketchboard.clientWidth
    sketchboard.height = sketchboard.clientHeight
    toolOneCont.classList.remove("toolbar-el-transition")
    toolTwoCont.classList.remove("toolbar-el-transition")
    saveBtnCont.classList.remove("toolbar-el-transition")
    ctx.strokeStyle = colourChange.value
    ctx.lineWidth = lineWidth.value
    ctx.lineCap = "round"
    drawPaths(pathArray)
    drawShapes(shapeArray)
})



// The idea is to store arrays of paths and recreate them.
const drawPaths = (pathArray) => {
    
    if(pathArray.length === 0) {
        return;
    }
    
    for (let i=0; i < pathArray.length; i += 3) {
        
        ctx.beginPath()
        ctx.strokeStyle = pathArray[i]
        ctx.lineWidth = pathArray[i+1]
        
        for(let j=0; j < pathArray[i+2].length; j += 2) {
            ctx.lineTo(pathArray[i+2][j], pathArray[i+2][j+1])
            ctx.stroke()
        }
    }
}


const undoDrawing = (pathArray) => {

    if(pathArray.length === 0) {
        return;
    }
    
    ctx.clearRect(0,0,sketchboard.width,sketchboard.height)
    pathArray.splice(pathArray.length-3,3)
}


const storeArray = () => {

    pathArray.push(colourChange.value,lineWidth.value,xyPath)
    xyPath = []
}


colourChange.addEventListener("change", (e) => {
    
    ctx.strokeStyle = e.target.value
    ctx.fillStyle = e.target.value
})


lineWidth.addEventListener("change", (e) => {
    
    if (e.target.value > 60) {
        e.target.value = 60
    }

    if (e.target.value < 1) {
        e.target.value = 1
    }

    ctx.lineWidth = e.target.value
})


document.querySelector("#clear-canvas").addEventListener("click", (e) => {
    
    isSketching = false
    ctx.clearRect(0,0,sketchboard.width,sketchboard.height)
    pathArray = []
    shapeArray = []
})


document.querySelector("#undo-change").addEventListener("click", (e) => {

    undoDrawing(pathArray)
    drawPaths(pathArray)
    drawShapes(shapeArray)
    ctx.strokeStyle = colourChange.value
    ctx.lineWidth = lineWidth.value
})


sketchboard.addEventListener("mousedown", (e) => {
    
    x = e.clientX - sketchboard.offsetLeft
    y = e.clientY - sketchboard.offsetTop
    // width works as radius for circle
    width = parseInt(widthInput.value)
    height = parseInt(heightInput.value)
    let linew = lineWidth.value
    let colour = colourChange.value
      
    if (squareCreation) {
        isSketching = false
        drawSquare(fillShape,linew,colour,x,y,width,height)
        saveSquareInfoToArray(fillShape,linew,colour,x,y,width,height)
    
    } else if (circleCreation) {
        isSketching = false
        drawCircle(fillShape,linew,colour,x,y,width,0)
        saveCircleInfoToArray(fillShape,linew,colour,x,y,width,0)
    
    } else if (triangleCreation) {
        isSketching = false
        drawTriangle(fillShape,linew,colour,x,y,width,height)
        saveTriangleInfoToArray(fillShape,linew,colour,x,y,width,height)
    
    } else {
        isSketching = true
        ctx.lineCap = "round"
        ctx.beginPath()
    }
})


sketchboard.addEventListener("mouseup", (e) => {
    
    if(squareCreation || triangleCreation || circleCreation) {
        return;
    } else {
        isSketching = false
        storeArray()
    }
})


const sketching = (e) => {
    
    if (!isSketching) {
        sketchboard.style.cursor = "default"
        return;
    }

    // this is here because if I mouse off the canvas
    // it never registers that I stopped drawing
    // and continues as soon as I mouse over again
    if (e.buttons !== 1) {
        isSketching = false
        storeArray()
        return;
    }

    sketchboard.style.cursor = "url('images/brush.png'),auto"
    xyPath.push(e.clientX - sketchboard.offsetLeft,e.clientY - sketchboard.offsetTop)
    ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop)
    ctx.stroke()
}


sketchboard.addEventListener("mousemove", sketching)