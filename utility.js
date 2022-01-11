let sketchboard = document.querySelector("canvas.sketch")
let ctx = sketchboard.getContext("2d")

sketchboard.width = sketchboard.clientWidth
sketchboard.height = sketchboard.clientHeight


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


// Ugly but works
document.querySelector("#load-btn").addEventListener("click", (e) => {
    
    if (document.querySelector("#load-input").files[0] === undefined) {
        return;
    } else {
    
        let imageType = document.querySelector("#load-input").files[0].type
        let imageFile = document.querySelector("#load-input").files[0]
        let maxWidth;
        let maxHeight;
        let counter = checkImageFormat(imageType)

        // clear canvas before drawing in case there is another image displayed
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
                        // here I am trying to preserve the correct height and width of the image
                        // by figuring out the difference between height and width and then
                        // dividing that by the new width or height.
                        if (image.width < image.height) {
                            maxWidth = Math.floor(sketchboard.width/(image.height/image.width))
                        } else {
                            maxWidth = sketchboard.width
                        }
                    }

                    if (image.height < sketchboard.height) {
                        maxHeight = image.height
                    } else {
                        if (image.height < image.width) {
                            maxHeight = Math.floor(sketchboard.height/(image.width/image.height))
                        } else {
                        maxHeight = sketchboard.height
                        }
                    }
                    // draw image to canvas and centre it
                    ctx.drawImage(image,Math.floor((sketchboard.width - maxWidth)/2),Math.floor((sketchboard.height - maxHeight)/2), maxWidth, maxHeight)
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
    
    let data = sketchboard.toDataURL("image/jpg",1)
    downloadCanvasImage(data)
})