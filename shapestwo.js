const drawCircle = (x,y,radius,sAngle=0,eAngle) => {

    ctx.arc(x,y,radius,sAngle,eAngle)
    //ctx.fill()
    ctx.stroke()
}


drawCircle(540,400, 600, 0, Math.PI*2)


// remember to add a condition for triangle when I add it
const createCircle = document.querySelector("button.create-circle")
createCircle.addEventListener("click", (e) => {

    if(!circleCreation && !squareCreation) {
        circleCreation = true
    } else {
        circleCreation = false
    }
})