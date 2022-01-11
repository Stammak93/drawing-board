//################################################################
// Sketchboard stuff

let colourChange = document.querySelector("#colour") // just the element
let lineWidth = document.querySelector("#line-width") // just the element
let isSketching = false
ctx.strokeStyle = document.querySelector("#colour").value // initial value on page load
ctx.lineWidth = document.querySelector("#line-width").value // initial value on page load
ctx.lineCap = "round"
let startX;
let startY;
let i = 0
let rainbowSwitch = 0
let confettiSwitch = 0
let rainbowColours = ["red","orange","yellow","green","blue","indigo","violet"]



colourChange.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value
})


lineWidth.addEventListener("change", (e) => {
    if (e.target.value > 15) {
        e.target.value = 15
    }

    if (e.target.value < 1) {
        e.target.value = 1
    }

    ctx.lineWidth = e.target.value
})


document.querySelector("#clear-canvas").addEventListener("click", (e) => {
    ctx.clearRect(0, 0, sketchboard.width, sketchboard.height)
    sketchboard.style.height = "900px"
    sketchboard.style.width = "900px"
    sketchboard.height = 900
    sketchboard.width = 900
    sketchboardContainer.style.height = "900px"
    sketchboardContainer.style.width = "900px"
    ctx.lineWidth = document.querySelector("#line-width").value
})


const sketching = (e) => {
    if (!isSketching) {
        return;
    }

    if (e.buttons !== 1) {
        isSketching = false
    }

    ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop)
    ctx.stroke()
}


document.querySelector(".rainbow-colours").addEventListener("click", (e) =>{

    if (rainbowSwitch === 1) {
        rainbowSwitch = 0
        document.querySelector(".rainbow-colours").textContent = "Click Me for Rainbows"
    } else {
        rainbowSwitch = 1
        document.querySelector(".rainbow-colours").textContent = "Click Me to Cancel"
    }
})


document.querySelector(".confetti").addEventListener("click", (e) =>{

    if (confettiSwitch === 1) {
        confettiSwitch = 0
        document.querySelector(".confetti").textContent = "Click Me for Confetti"
    } else {
        confettiSwitch = 1
        document.querySelector(".confetti").textContent = "Click Me to Cancel"
    }
})


sketchboard.addEventListener("mousedown", (e) =>{
    
    i = 0
    isSketching = true
    startX = e.clientX;
    startY = e.clientY;

    if(rainbowSwitch === 1 && confettiSwitch === 0) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[i]
            i++
            ctx.beginPath()
            if(i === 6) {
                i = 0
            } 
            if(rainbowSwitch === 0) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },50)
    
    } else if (confettiSwitch === 1 && rainbowSwitch === 0) {
        let t = setInterval( function () {
            ctx.strokeStyle = rainbowColours[i]
            i++
            ctx.beginPath()
            if(i === 6) {
                i = 0
            } 
            if(confettiSwitch === 0) {
                clearInterval(t)
                ctx.strokeStyle = document.querySelector("#colour").value
            }
        },10)
    
    } else {
        confettiSwitch = 0 
        rainbowSwitch = 0
        document.querySelector(".confetti").textContent = "Click Me for Confetti"
        document.querySelector(".rainbow-colours").textContent = "Click Me for Rainbows"
    }


})


sketchboard.addEventListener("mouseup", (e) => {
    isSketching = false
    ctx.stroke()
    ctx.beginPath()
})


sketchboard.addEventListener("mousemove", sketching)