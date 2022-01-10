
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


document.querySelector("#clear-canvas").addEventListener("click", (e) => {
    ctx.clearRect(0, 0, sketchboard.width, sketchboard.height)
})


const checkImageFormat = (imageLink) => {
    
    let counter = 0
    let formatList = ["jpeg","svg","png","tiff","gif","bmp"]
    
    for(let i=0; i < 5; i++) {
        if(imageLink.match(/\w+$/)[0] === formatList[i]) {
            counter += 1
        }
    }

    if (counter === 1) {
        return 1
    } else {
        return 0
    }
}

// A beast of a function!

document.querySelector("#load-btn").addEventListener("click", (e) => {
    
    if (document.querySelector("#load-input").files[0] === undefined) {
        return;
    } else {
    
        let imageType = document.querySelector("#load-input").files[0].type
        let imageFile = document.querySelector("#load-input").files[0]
        let maxWidth;
        let maxHeight;
        
        let counter = checkImageFormat(imageType)
        // clear canvas
        ctx.clearRect(0, 0, sketchboard.width, sketchboard.height)

        if (counter === 1){
            let reader = new FileReader()
            reader.onload = function(imageFile) {
                let image = new Image()
                image.onload = function(){
                    // checking whether the image is larger than canvas
                    // and then drawing to canvas accordingly
                    if (image.width < sketchboard.width) {
                        maxWidth = image.width
                    } else {
                        maxWidth = sketchboard.width
                    }

                    if (image.height < sketchboard.height) {
                        maxHeight = image.height
                    } else {
                        maxHeight = sketchboard.height
                    }
                    console.log(maxWidth, maxHeight)
                    ctx.drawImage(image,Math.floor((sketchboard.width - maxWidth)/2),Math.floor((sketchboard.height - maxHeight)/2), maxWidth, maxHeight)
                    }
                    image.src = imageFile.target.result
                }
                reader.readAsDataURL(imageFile)
                document.querySelector("#load-input").value = ""
        } else {
            alert("Sorry, that file format isn't supported.")
        }
    }
})


//################################################################
// Sketchboard stuff

let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")

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

    ctx.lineTo(e.clientX - sketchboard.offsetLeft, e.clientY - sketchboard.offsetTop)
    ctx.stroke()
}


sketchboard.addEventListener("mousedown", (e) =>{
    
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


// ##################################################
// Canvas image manipulation stuff

const imageManipulation = (data) => {
    for (let i=0; i < data.length; i+= 2) {
        data[i] = 150
    }
}

const imageEffect = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)

    imageManipulation(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}


document.querySelector("#image-effect").addEventListener("click", imageEffect)

// ########################################
// Something Else stuff


const downloadCanvasImage = (data, filename="untitled.jpg") => {
    let aTag = document.createElement("a")
    aTag.href = data
    aTag.download = filename
    document.body.appendChild(aTag)
    aTag.click()
}


document.querySelector("button#save-as").addEventListener("click", (e) => {
    
    let data = sketchboard.toDataURL("image/jpg",1)
    downloadCanvasImage(data)
})