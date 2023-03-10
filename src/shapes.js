
const enableSquareTriangleInputs = (squareCreation, triangleCreation) => {
    
    let inputs = document.querySelectorAll(".tool")
    
    if (squareCreation || triangleCreation) {
        
        document.querySelector("label[for='width-slider']").textContent = "Width"
        
        inputs.forEach((input) => {
            input.disabled = false
        })

    }
}


const enableCircleInputs = (circleCreation) => {

    let inputs = document.querySelectorAll(".tool")
    
    if (circleCreation) {
        document.querySelector("label[for='width-slider']").textContent = "Radius"
        
        for(let i=0; i < 2; i++) {
            inputs[i].disabled = false
        }
    }
}


const drawShapes = (shapeArray,ctx) => {

    for (let i=0; i < shapeArray.length; i+=8) {

        if(shapeArray[i] === "square") {
            drawSquare(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7],ctx)            
        
        } else if (shapeArray[i] === "circle") {

            drawCircle(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7],ctx)

        } else {
            drawTriangle(shapeArray[i+1],shapeArray[i+2],shapeArray[i+3],shapeArray[i+4],
                shapeArray[i+5],shapeArray[i+6],shapeArray[i+7],ctx)
        }
    }

}


const undoShapes = (ctx, shapeArray, sketchboard) => {

    if(shapeArray.length === 0) {
        return;
    }

    ctx.clearRect(0,0,sketchboard.width,sketchboard.height);
    shapeArray.splice(shapeArray.length - 8, 8);
}


// Triangle Related stuff

const drawTriangle = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue,ctx) => {

    ctx.lineWidth = lineW

    let triangleWidth = Math.floor(widthValue/2)
    
    if(fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.moveTo(xValue,yValue)
        ctx.lineTo(xValue-triangleWidth, yValue+heightValue)
        ctx.lineTo(xValue+triangleWidth, yValue+heightValue)
        ctx.fill()

    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.moveTo(xValue,yValue)
        ctx.lineTo(xValue-triangleWidth, yValue+heightValue)
        ctx.lineTo(xValue+triangleWidth, yValue+heightValue)
        ctx.closePath()
        ctx.stroke()
    }
}


// Circle Related Stuff

const drawCircle = (fillShape,lineW,colour,xValue,yValue,radiusValue,sAngle=0,ctx) => {

    ctx.lineWidth = lineW
    
    if (fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.arc(xValue,yValue,radiusValue,sAngle,Math.PI*2)
        ctx.fill()
        ctx.stroke()
    
    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.arc(xValue,yValue,radiusValue,sAngle,Math.PI*2)
        ctx.stroke()
    }
}


// Square Related Stuff

const drawSquare = (fillShape,lineW,colour,xValue,yValue,widthValue,heightValue,ctx) => {

    ctx.lineWidth = lineW
    
    if(fillShape === "fill") {
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.fillRect(xValue,yValue,widthValue,heightValue)
    
    } else {
        ctx.strokeStyle = colour
        ctx.beginPath()
        ctx.strokeRect(xValue,yValue,widthValue,heightValue)
    }
}


module.exports = {
    enableSquareTriangleInputs,
    enableCircleInputs,
    drawShapes,
    undoShapes,
    drawTriangle,
    drawCircle,
    drawSquare,
};