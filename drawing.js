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
let rainbowColoursIndex = 0
let rainbowSwitch = 0
let confettiSwitch = 0
let rainbowColours = ["red","orange","yellow","green","blue","indigo","violet"]



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
})


const sketching = (e) => {
    
    if (!isSketching) {
        return;
    }

    if (e.buttons !== 1) {
        isSketching = false
        return;
    }

    sketchboard.style.cursor = "url('images/brush.png'),auto"
    ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop)
    ctx.stroke()
}

sketchboard.addEventListener("mousemove", sketching)