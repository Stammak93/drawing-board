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


let toolbarOne = false
let toolbarTwo = false
let saveBtn = false
const toggleOne = document.querySelector("#tl-bar-1")
const toggleTwo = document.querySelector("#tl-bar-2")
const toggleSave = document.querySelector("#sv-btn-toggle")
const toolOneCont = document.querySelector(".toolbar-container-one")
const toolTwoCont = document.querySelector(".toolbar-container-two")
const saveBtnCont = document.querySelector(".save-btn")


const toggleFunction = () => {

    if(toolbarOne) {
        toolOneCont.classList.add("toolbar-el-transition")
    } else {
        toolOneCont.classList.remove("toolbar-el-transition")
    }

    if(toolbarTwo) {
        toolTwoCont.classList.add("toolbar-el-transition")
    } else {
        toolTwoCont.classList.remove("toolbar-el-transition")
    }

    if(saveBtn) {
        saveBtnCont.classList.add("toolbar-el-transition")
    } else {
        saveBtnCont.classList.remove("toolbar-el-transition")
    }
}



toggleOne.addEventListener("click",(e) => {

    if(toolbarOne) {
        toolbarOne = false
        toggleFunction()
    } else if (!toolbarOne && toolbarTwo || saveBtn) {
        toolbarOne = true
        toolbarTwo = false
        saveBtn = false
        toggleFunction()
    } else {
        toolbarOne = true
        toggleFunction()
    }
})


toggleTwo.addEventListener("click",(e) => {

    if(toolbarTwo) {
        toolbarTwo = false
        toggleFunction()
    } else if (!toolbarTwo && toolbarOne || saveBtn) {
        toolbarOne = false
        toolbarTwo = true
        saveBtn = false
        toggleFunction()
    } else {
        toolbarTwo = true
        toggleFunction()
    }
})


toggleSave.addEventListener("click",(e) => {

    if(saveBtn) {
        saveBtn = false
        toggleFunction()
    } else if (!saveBtn && toolbarOne || toolbarTwo) {
        toolbarOne = false
        toolbarTwo = false
        saveBtn = true
        toggleFunction()
    } else {
        saveBtn = true
        toggleFunction()
    }
})