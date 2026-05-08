// declaring variables to html attributes
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("scoreDisplay");
const resetBtn = document.getElementById("resetBtn");

// gameBoard is a canvas that requires 2d rendering
const ctx = gameBoard.getContext("2d");

// defining the parameters for the gameboard
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";

// snake and food related parameters
const snakeColor = "lightgreen";
const snakeBorder = "black";
const unitSize = 10; // snake and food size
const foodColor = "red";

// 
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

// game mechanics 
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running= true;
    scoreDisplay.textContent = `Score: ${score}`;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreDisplay.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

function changeDirection(dir) {
    dir = dir.toLowerCase();
    console.log("direction received:", dir); // add this temporarily

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(dir == 'left' && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(dir == 'up' && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(dir == 'right' && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(dir == 'down' && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};

// create a container for chat
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const lastTyped = document.getElementById('lastTypedDisplay');

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const text = chatInput.value.trim();
    if (text === '') return;

    changeDirection(text);

    // Create and append new message
    const msg = document.createElement('p');
    msg.textContent = text;
    chatMessages.appendChild(msg);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.getElementById('lastTypedDisplay').textContent = `Last Typed: ${text}`;

    // Clear input
    chatInput.value = '';
  }
});
