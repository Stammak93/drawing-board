export const disableInputs = () => {

    let inputs = document.querySelectorAll(".tool")
      
    inputs.forEach((input) => { 
        input.disabled = true
    })
};

export const resetInputs = () => {

    let inputs = document.querySelectorAll(".tool")

    inputs.forEach((input) => {

        input.value = 50
    })
}

// Save function

export const downloadCanvasImage = (data, filename="untitled.png") => {
    let aTag = document.createElement("a")
    aTag.href = data
    aTag.download = filename
    document.body.appendChild(aTag)
    aTag.click()
}