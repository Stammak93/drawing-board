let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")
sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight
let sketchboardContainer = document.querySelector("div.sketch-container")






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


const cheapRatioAdjustment = (value, difference) => {
    
    
    if (value === "height") {
        sketchboard.style.width = "900px"
        sketchboard.style.height = `${Math.floor(900/difference)}px`
        sketchboardContainer.style.width = "900px"
        sketchboardContainer.style.height = `${Math.floor(900/difference)}px`
    
    } else if (value === "width") {
        sketchboard.style.width = `${Math.floor(900/difference)}px`
        sketchboard.style.height = "900px"
        sketchboardContainer.style.width = `${Math.floor(900/difference)}px`
        sketchboardContainer.style.height = "900px"


    } else {
        sketchboard.style.width = "900px"
        sketchboard.style.height = "900px"
        sketchboardContainer.style.width = "900px"
        sketchboardContainer.style.height = "900px"
    }
}



// Ugly but works
document.querySelector("#load-btn").addEventListener("click", (e) => {
    
    if (document.querySelector("#load-input").files[0] === undefined) {
        return;
    } else {
    
        let imageType = document.querySelector("#load-input").files[0].type
        let imageFile = document.querySelector("#load-input").files[0]
        let adjustment;
        let imageDifference;
        let counter = checkImageFormat(imageType)

        // clear canvas before drawing in case there is another image displayed
        ctx.clearRect(0, 0, sketchboard.width, sketchboard.height)

        if (counter === 1){
            let reader = new FileReader()
            reader.onload = function(imageFile) {
                let image = new Image()
                image.onload = function(){

                    if (image.width < image.height) {
                        adjustment = "width"
                        imageDifference = image.height/image.width
                    } else if (image.width > image.height) {
                        adjustment = "height"
                        imageDifference = image.width/image.height
                    } else {
                        adjustment = "none"
                        imageDifference = 0
                    }

                    sketchboard.height = image.height
                    sketchboard.width = image.width


                    ctx.drawImage(image,0, 0, sketchboard.width, sketchboard.height)
                    cheapRatioAdjustment(adjustment,imageDifference)
                    }
                    image.src = imageFile.target.result
                }
                reader.readAsDataURL(imageFile)
        
        } else {
            alert("Sorry, that file format isn't supported.")
            return;
        }
    }
})


// ########################################
// Save button functionality


const downloadCanvasImage = (data, filename="untitled.jpg") => {
    let aTag = document.createElement("a")
    aTag.href = data
    aTag.download = filename
    document.body.appendChild(aTag)
    aTag.click()
}


document.querySelector("button#save-as").addEventListener("click", (e) => {
    
    let data = sketchboard.toDataURL("image/png",1)
    downloadCanvasImage(data)
})