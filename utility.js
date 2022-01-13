// Save function

const downloadCanvasImage = (data, filename="untitled.png") => {
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