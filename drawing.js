//################################################################
// Sketchboard stuff

let sketchboardContainer = document.querySelector("div.sketch-container")
let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")

sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight
let colourChange = document.querySelector("#colour") // just the element
let lineWidth = document.querySelector("#line-width") // just the element
let isSketching = false
ctx.strokeStyle = document.querySelector("#colour").value // initial value on page load
ctx.lineWidth = document.querySelector("#line-width").value // initial value on page load
ctx.lineCap = "round"

let rainbowSwitch = 0
let confettiSwitch = 0
let rainbowColours = ["red","orange","yellow","green","blue","indigo","violet"]
let rainbowColoursIndex = 0
let xPath = []
let yPath = []
let pathArray = []



const drawPaths = (pathArray) => {
    
    ctx.beginPath()
    for (let i=0; i < pathArray.length; i += 4) {
        for(let j=0; j < pathArray[i+2].length; j++) {
            ctx.strokeStyle = pathArray[i]
            ctx.lineWidth = pathArray[i+1]
            ctx.lineTo(pathArray[i+2][j], pathArray[i+3][j])
            ctx.stroke()
        }
    }
}


const undoDrawing = (pathArray) => {

    ctx.clearRect(0,0,sketchboard.width,sketchboard.height)
    pathArray.splice(pathArray.length-4,4)
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

    if (rainbowSwitch === 1) {
        rainbowSwitch = 0
        document.querySelector(".rainbow-colours").textContent = "Rainbows"
    } else {
        rainbowSwitch = 1
        document.querySelector(".rainbow-colours").textContent = "Cancel"
    }
})


document.querySelector(".confetti").addEventListener("click", (e) =>{

    if (confettiSwitch === 1) {
        confettiSwitch = 0
        document.querySelector(".confetti").textContent = "Confetti"
    } else {
        confettiSwitch = 1
        document.querySelector(".confetti").textContent = "Cancel"
    }
})


sketchboard.addEventListener("mousedown", (e) => {
    
    rainbowColoursIndex = 0
    isSketching = true
    ctx.lineCap = "round"
    ctx.beginPath()

    if(rainbowSwitch === 1 && confettiSwitch === 0) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[rainbowColoursIndex]
            rainbowColoursIndex++
            ctx.beginPath()
            if(rainbowColoursIndex === 6) {
                rainbowColoursIndex = 0
            } 
            if(rainbowSwitch === 0) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },70)
    
    } else if (confettiSwitch === 1 && rainbowSwitch === 0) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[rainbowColoursIndex]
            rainbowColoursIndex++
            ctx.beginPath()
            //ctx.stroke()
            if(rainbowColoursIndex === 6) {
                rainbowColoursIndex = 0
            } 
            if(confettiSwitch === 0) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },10)
    
    } else {
        confettiSwitch = 0 
        rainbowSwitch = 0
        document.querySelector(".confetti").textContent = "Confetti"
        document.querySelector(".rainbow-colours").textContent = "Rainbows"
    }

})


sketchboard.addEventListener("mouseup", (e) => {
    isSketching = false
    storeArrays()
})


const sketching = (e) => {
    
    if (!isSketching) {
        return;
    }

    // this is here because if I mouse off the canvas
    // it never registers that I stopped drawing
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
