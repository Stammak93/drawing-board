
const experimentalFilter = (data) => {

    for (let i=0; i < data.length; i += 4) {
        if((data[i]+data[i+1]+data[i+2]) < 500) {
            data[i] = 0
            data[i+1] = 0
            data[i+2] = 0
        }
    }
    
    for (let i=0; i < data.length; i += 4) {
        data[i+1] = Math.floor((255 - data[i+1])/5)
        data[i+2] = Math.floor((255 - data[i+2])/5)
    }

}


const blackAndOther = (data) => {
    for (let i=0; i < data.length; i += 4) {
        if((data[i]+data[i+1]+data[i+2]) < 500) {
            data[i] = 0
            data[i+1] = 0
            data[i+2] = 0
        }
    }
}


const fishnetFilter = (data) => {
    for (let i=0; i < data.length; i += 20) {
        data[i] = Math.floor(Math.random()*256)
        data[i+1] = Math.floor(Math.random()*256)
        data[i+2] = Math.floor(Math.random()*256)
    }
}


const invertColourFilter = (data) => {
    for (let i=0; i < data.length; i += 4) {
        data[i] = 255 - data[i]
        data[i+1] = 255 - data[i+1]
        data[i+2] = 255 - data[i+2]
    }
}


const blackAndWhiteFilter = (data) => {
    for (let i=0; i < data.length; i += 4) {
        let value = data[i]+data[i+1]+data[i+2]
        data[i] = Math.floor(value/3)
        data[i+1] = Math.floor(value/3)
        data[i+2] = Math.floor(value/3)
    }
}


const everythingRedFilter = (data) => {
    for (let i=0; i < data.length; i += 4) {
        data[i+1] = Math.floor((255 - data[i+1])/5)
        data[i+2] = Math.floor((255 - data[i+2])/5)
    }
}



const strongSepiaFilter = (data) => {
    for (let i=0; i < data.length; i += 4) {
        let value = data[i]+data[i+1]+data[i+2]
        if (Math.floor(value/2.5) > 255) {
            data[i] = 255
        } else {
            data[i] = Math.floor(value/2.5)
        }
        data[i+1] = Math.floor(value/4)
        data[i+2] = Math.floor(value/10)
    }
}


const imageEffectSepia = () => {
    
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)

    strongSepiaFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}


const imageEffectAllRed = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)


    everythingRedFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}

const imageEffectVeryBlack = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)


    blackAndOther(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}

const imageEffectBlackandWhite = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)

    blackAndWhiteFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}

const imageEffectNegative = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)

    invertColourFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}

const imageEffectFishnet = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)


    fishnetFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}


const imageEffectExperimental = () => {
    imageData = ctx.getImageData(0, 0, sketchboard.width, sketchboard.height)


    experimentalFilter(imageData.data)

    ctx.putImageData(imageData, 0, 0)
}


document.querySelector("#sepia").addEventListener("click", imageEffectSepia)
document.querySelector("#all-red").addEventListener("click", imageEffectAllRed)
document.querySelector("#all-black").addEventListener("click", imageEffectVeryBlack)
document.querySelector("#black-and-white").addEventListener("click", imageEffectBlackandWhite)
document.querySelector("#negative").addEventListener("click", imageEffectNegative)
document.querySelector("#fishnet").addEventListener("click", imageEffectFishnet)
document.querySelector("#exp-filter").addEventListener("click", imageEffectExperimental)