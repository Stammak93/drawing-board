let sketchboard = document.querySelector("canvas.sketch")
let colourChange = document.querySelector("#colour")
let lineWidth = document.querySelector("#line-width")



// ##################################################
// Toolbar stuff


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


document.querySelector("#paste-btn").addEventListener("click", (e) => {
    
    let counter = 0
    let validFormatList = ["jpg","svg","png","tiff","gif","bmp"]
    let srcLink = document.querySelector("#paste-input").value

    for(let i=0; i < 5; i++) {
        if(srcLink.match(/\w+$/)[0] === validFormatList[i]) {
            counter += 1
        }
    }
    
    if (counter === 1) {
        let image = new Image()
        image.onload = function(){
            ctx.drawImage(image, 0, 0, sketchboard.width, sketchboard.height)
        }
        image.src = srcLink
        document.querySelector("#paste-input").value = ""
    
    } else {
        alert("It appears that the link does not contain a valid image format.")    
    }
})


//################################################################
// Sketchboard stuff


let ctx = sketchboard.getContext("2d")
sketchboardOffsetLeft = sketchboard.offsetLeft
sketchboardOffsetTop = sketchboard.offsetTop
sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight


let isSketching = false
ctx.strokeStyle = document.querySelector("#colour").value
ctx.lineWidth = 5
ctx.lineCap = "round"
let startX;
let startY;


const sketching = (e) => {
    if (!isSketching) {
        return;
    }

    if (e.buttons !== 1) {
        isSketching = false
    }

    ctx.lineTo(e.clientX - sketchboardOffsetLeft, e.clientY - sketchboardOffsetTop)
    ctx.stroke()
}

sketchboard.addEventListener("mousedown", (e) =>{
    sketchboardOffsetLeft = sketchboard.offsetLeft
    sketchboardOffsetTop = sketchboard.offsetTop
    isSketching = true
    startX = e.clientX;
    startY = e.clientY;
})

sketchboard.addEventListener("mouseup", (e) => {
    isSketching = false
    ctx.stroke()
    ctx.beginPath()
})

sketchboard.addEventListener("mousemove", sketching)
