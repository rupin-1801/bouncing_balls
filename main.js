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
    this.exist = true;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

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

canvas.onclick = function(event){
    for(let i = 0; i < ballpool.length; i++){
        let xdiff = Math.abs(event.clientX - ballpool[i].x);
        let ydiff = Math.abs(event.clientY - ballpool[i].y);
        if(xdiff <= ballpool[i].size && ydiff <= ballpool[i].size && ballpool[i].exist){
            ballpool[i].exist = false;
        }
    }
}

Ball.prototype.collisionDetect = function(){
    for(let j = 0; j < ballpool.length; j++){
        if(!(ballpool[j] == this) && ballpool[j].exist){
            const dx = this.x - ballpool[j].x;
            const dy = this.y - ballpool[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if(dist <= this.size + ballpool[j].size){
                this.color = ballpool[j].color = 'rgb('+random(0, 255)+', '+random(0, 255)+', '+ random(0, 255)+')';
            }
        }
    }
}

let ballpool = [];
let n = Math.floor(width/30);
while(ballpool.length < random(n, n+10)){
    let size = random(10, 20);
    let velx = random(-5,5);
    let vely = random(-5,5);
    let ball = new Ball(
        random(0+size, width-size),
        random(0+size, height-size),
        (velx < 0)?velx-2:velx+2,
        (vely < 0)?vely-2:vely+2,
        'rgb('+random(0, 255)+', '+random(0, 255)+', '+ random(0, 255)+')',
        size
    );
    ballpool.push(ball);
}

function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);
    for(let i = 0; i < ballpool.length; i++){
        if(ballpool[i].exist){
            ballpool[i].draw();
            ballpool[i].update();
            ballpool[i].collisionDetect();
        }
    }
    requestAnimationFrame(loop);
}

loop();
console.log(ballpool);