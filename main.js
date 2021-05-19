const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.onresize = function(){
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
}

function random(min, max){
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velx, vely, color, size){
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// console.log(testball.color, testball.size, testball.x, testball.y);
Ball.prototype.update = function(){
    if(this.x + this.size >= width || this.x - this.size <= 0){
        this.velx = -(this.velx);
    }
    if(this.y + this.size >= height || this.y - this.size <= 0){
        this.vely = -(this.vely);
    }
    this.x += this.velx;
    this.y += this.vely;
}

let ballpool = [];
while(ballpool.length < 25){
    let size = random(10, 20);
    let ball = new Ball(
        random(0+size, width-size),
        random(0+size, height-size),
        random(-5, 5),
        random(-5, 5),
        'rgb('+random(0, 255)+', '+random(0, 255)+', '+ random(0, 255)+')',
        size
    );
    ballpool.push(ball);
}
console.log(ballpool);