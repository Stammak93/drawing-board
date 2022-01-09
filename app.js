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


document.querySelector("#clear-canvas").addEventListener("click", (e) => {
    ctx.clearRect(0, 0, sketchboard.width, sketchboard.height)
})


const checkImageUrl = async (url) => {
    const response = await fetch(url)
    if (response.ok) {
        return true
    }
}

const checkImageFormat = (imageLink, formatList) => {
    
    let counter = 0
    
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

document.querySelector("#paste-btn").addEventListener("click", (e) => {
    
    let validFormatList = ["jpg","svg","png","tiff","gif","bmp"]
    let srcLink = document.querySelector("#paste-input").value
    let maxWidth;
    let maxHeight;

    let counter = checkImageFormat(srcLink,validFormatList)
    let websiteLink = async () => await checkImageUrl(srcLink)

    
    // checking if link is valid image or if text contains valid image format
    if (counter === 1 || websiteLink) {
        
        let image = new Image()
        image.onload = function(){
            if (image.width > 0) {
                
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
                console.log(maxHeight, maxWidth)
                ctx.drawImage(image,Math.floor((sketchboard.width - image.width)/2),Math.floor((sketchboard.height - image.height)/2), maxWidth, maxHeight)
            }
        }
        image.src = srcLink
    
    } else {
        alert("It appears that the link does not contain a valid image format.")    
    }
})


//################################################################
// Sketchboard stuff


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
    sketchboard.offsetLeft
    sketchboard.offsetTop
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

//let image = document.querySelector("canvas.sketch")

const imageManipulation = (data) => {
    for (let i=0; i < data.length; i++) {
        data[i] = 255
    }
}

const imageEffect = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)

    imageManipulation(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}


document.querySelector("#image-effect").addEventListener("click", imageEffect)

