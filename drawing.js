//################################################################
// Sketchboard stuff

let sketchboardContainer = document.querySelector("div.sketch-container")
let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")

sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight
let colourChange = document.querySelector("#colour")
let lineWidth = document.querySelector("#line-width")
ctx.strokeStyle = document.querySelector("#colour").value // initial value on page load
ctx.lineWidth = document.querySelector("#line-width").value // initial value on page load
ctx.lineCap = "round"

let isSketching = false
let rainbowSwitch = false
let confettiSwitch = false
let rainbowColours = ["red","orange","yellow","green","blue","indigo","violet"]
let rainbowColoursIndex = 0
let xPath = []
let yPath = []
let pathArray = []



const drawPaths = (pathArray) => {
    
    for (let i=0; i < pathArray.length; i += 4) {
        
        ctx.beginPath()
        ctx.strokeStyle = pathArray[i]
        ctx.lineWidth = pathArray[i+1]
        
        for(let j=0; j < pathArray[i+2].length; j++) {
            ctx.lineTo(pathArray[i+2][j], pathArray[i+3][j])
            ctx.stroke()
        }
    }
}


const undoDrawing = (pathArray) => {

    ctx.clearRect(0,0,sketchboard.width,sketchboard.height)
    pathArray.splice(pathArray.length-4,4)
    console.log(pathArray)
}


const storeArrays = () => {

    pathArray.push(colourChange.value,lineWidth.value,xPath,yPath)
    xPath = []
    yPath = []
}


colourChange.addEventListener("change", (e) => {
    
    ctx.strokeStyle = e.target.value
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
})


document.querySelector("#undo-change").addEventListener("click", (e) => {

    undoDrawing(pathArray)
    drawPaths(pathArray)
    ctx.strokeStyle = colourChange.value
    ctx.lineWidth = lineWidth.value
})




document.querySelector(".rainbow-colours").addEventListener("click", (e) =>{

    if (rainbowSwitch) {
        rainbowSwitch = false
        document.querySelector(".rainbow-colours").textContent = "Rainbows"
    } else {
        rainbowSwitch = true
        document.querySelector(".rainbow-colours").textContent = "Cancel"
    }
})


document.querySelector(".confetti").addEventListener("click", (e) =>{

    if (confettiSwitch) {
        confettiSwitch = false
        document.querySelector(".confetti").textContent = "Confetti"
    } else {
        confettiSwitch = true
        document.querySelector(".confetti").textContent = "Cancel"
    }
})


// Although fun, there is no way I can undo
sketchboard.addEventListener("mousedown", (e) => {
    
    rainbowColoursIndex = 0
    isSketching = true
    ctx.lineCap = "round"
    ctx.beginPath()

    if(rainbowSwitch && !confettiSwitch) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[rainbowColoursIndex]
            rainbowColoursIndex++
            ctx.beginPath()
            if(rainbowColoursIndex === 6) {
                rainbowColoursIndex = 0
            } 
            if(!rainbowSwitch) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },70)
    
    } else if (confettiSwitch && !rainbowSwitch) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[rainbowColoursIndex]
            rainbowColoursIndex++
            ctx.beginPath()
            if(rainbowColoursIndex === 6) {
                rainbowColoursIndex = 0
            } 
            if(!confettiSwitch) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },10)
    
    } else {
        confettiSwitch = false
        rainbowSwitch = false
        document.querySelector(".confetti").textContent = "Confetti"
        document.querySelector(".rainbow-colours").textContent = "Rainbows"
    }

})


sketchboard.addEventListener("mouseup", (e) => {
    isSketching = false
    storeArrays()
    console.log(pathArray)
})


const sketching = (e) => {
    
    if (!isSketching) {
        return;
    }

    // this is here because if I mouse off the canvas
    // it never registers that I stopped drawing
    // and continues as soon as I mouse over
    if (e.buttons !== 1) {
        isSketching = false
        storeArrays()
        return;
    }

    sketchboard.style.cursor = "url('images/brush.png'),auto"
    xPath.push(e.clientX - sketchboard.offsetLeft)
    yPath.push(e.clientY - sketchboard.offsetTop)
    ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop)
    ctx.stroke()
}

sketchboard.addEventListener("mousemove", sketching)
