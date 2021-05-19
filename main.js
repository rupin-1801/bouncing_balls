const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

window.onresize = function(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
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

Ball.prototype.collisionDetect = function(){
    for(let j = 0; j < ballpool.length; j++){
        if(!(ballpool[j] == this)){
            const dx = this.x - ballpool[j].x;
            const dy = this.y - ballpool[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < this.size + ballpool[j].size){
                this.color = ballpool[j].color = 'rgb('+random(0, 255)+', '+random(0, 255)+', '+ random(0, 255)+')';
            }
        }
    }
}

let ballpool = [];
while(ballpool.length < 25){
    let size = random(15, 20);
    let ball = new Ball(
        random(0+size, width-size),
        random(0+size, height-size),
        random(-10, 10),
        random(-10, 10),
        'rgb('+random(0, 255)+', '+random(0, 255)+', '+ random(0, 255)+')',
        size
    );
    ballpool.push(ball);
}

function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, 0, width, height);
    for(let i = 0; i < ballpool.length; i++){
        ballpool[i].draw();
        ballpool[i].update();
        ballpool[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}

loop();
