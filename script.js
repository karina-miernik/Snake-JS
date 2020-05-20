const canvas = document.getElementById("snake")
const context = canvas.getContext("2d") //zwraca kontekst pola roboczego

// creating unit

const box = 32;

// loading images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png"

// load audio

const dead = new Audio()
const eat = new Audio()
const left = new Audio()
const right = new Audio()
const down = new Audio()
const up = new Audio()

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"
up.src = "audio/up.mp3"




// creating snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//creating food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//creating score

let score = 0;

//controlling snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    }
    else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    }
    else if (key == 38 && d != "DOWN") {
        d = "UP";
    }
    else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}
// check collision function

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i] && head.y == array[i]) {
            return true;
        }
        return false;
    }
}
// draw everything to the canvas

function draw() {
    context.drawImage(ground, 0, 0)

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "greenyellow";
        context.fillRect(snake[i].x, snake[i].y, box, box)

        context.strokeStyle = "olive";
        context.strokeRect(snake[i].x, snake[i].y, box, box)
    }

    context.drawImage(foodImg, food.x, food.y);

    // old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction

    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        //we dont remove the tail
    } else {
        //removing tail
        snake.pop()

    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //game over

    if (snakeX < box || snakeX > 17 * box ||
        snakeY < 3 * box || snakeY > 17 * box ||
        collision(newHead, snake)) {
        clearInterval(game);
    }
    // new head for snake
    snake.unshift(newHead)

    context.fillStyle = "white";
    context.font = "45px Changa one"
    context.fillText(score, 2 * box, 1.6 * box);
}



//calling draw function every 100 ms

let game = setInterval(draw, 100)
