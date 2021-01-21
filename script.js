let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"
let ctx = canvas.getContext('2d')
let circleX = 35;
let circleY = 35;
let circleRadius = 25
let incrementY = 5
let incrementX = 5
let isLeftArrow = false;
let isRightArrow = false
let paddleX = 150
let paddleWidth = 200
let paddleHeight = 25
let incrementPaddle = 5;
let score = 0;
let intervalID= 0 

let startBtn = document.querySelector('#start')

//handle arrow key click events here
document.addEventListener('keydown', (event) => {
     if (event.keyCode == 39 || event.key == "ArrowRight") {
        isRightArrow = true;
        isLeftArrow = false;
     }
     else if (event.keyCode == 37 || event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
     }
})

//make sure you disable the flags when you release the keys
document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
})

function drawCircle() {
    ctx.beginPath()
    ctx.arc(circleX,circleY, circleRadius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fillStyle = "#ff3333"
    ctx.fill()
    ctx.closePath()
}

function gameOver(){
    // update this as per your requirement
    canvas.style.display = 'none'
    //startBtn.style.display = 'block'
}

function ballCollision(){
    
    // check for right
    if (circleX + circleRadius > canvas.width) {
        // change this to a -ve num
        incrementX = -incrementX
    }  
    
    //check for bottom
    if (circleY + circleRadius > canvas.height) {
        // check if ball stays within paddle boundries
        if (circleX > paddleX && circleX < paddleX + paddleWidth) {
            incrementY = -incrementY
            score++
        }
        else {
            clearInterval(intervalID)
            gameOver()
        }
        
    }
    // check for top
    if (circleX - circleRadius < 0) {
        // keep this to a +ve num
        incrementX = 5
    }

    //check for left
    if (circleY - circleRadius < 0) {
        incrementY = 5
    }
}

function drawPaddle(){
    ctx.beginPath()
    ctx.fillStyle = "#33f5ff"
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.closePath()
}

function draw(){
    // clear the canvas so that the new images don't overlap the previous ones
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawCircle()
    drawPaddle()
    ballCollision()

    // show the score
    ctx.font = '24px Verdana'
    ctx.fillText('Score:' + score, 20, 20)

    // to make sure paddle moves and stays within boundries
    if (isRightArrow && (paddleX + paddleWidth < canvas.width)) {
        paddleX += incrementPaddle
    }
    else if (isLeftArrow && paddleX > 0) {
        paddleX -= incrementPaddle
    }


    // to make sure your circle is always moving
    circleX += incrementX
    circleY += incrementY
}

function startGame(){
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    intervalID = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
}

window.addEventListener('load', () => {
    canvas.style.display = 'none'

    // start click event listener
    startBtn.addEventListener('click', () => {
        startGame()
    })

})


