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

// draw everything to the canvas

function draw() {
    context.drawImage(ground, 0, 0)
}

//calling draw function every 100 ms

let game = setInterval(draw, 100)


