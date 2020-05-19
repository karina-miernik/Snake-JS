const canvas = document.getElementById("snake")
const context = canvas.getContext("2d") //zwraca kontekst pola roboczego

// creating unit

const box = 32;

// loading images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png"

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

// draw everything to the canvas

function draw() {
    context.drawImage(ground, 0, 0)

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box)

        context.strokeStyle = "mint";
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
    if (snakeX == food.x && snakeY == snake.Y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        } //we dont remove the tail
    } else {
        //removing tail
        snake.pop()

    }




    // new head for snake

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

    context.fillStyle = "lightgreen";
    context.font = "45px Changa one"
    context.fillText(score, 2 * box, 1.6 * box);



}



//calling draw function every 100 ms

let game = setInterval(draw, 200)


