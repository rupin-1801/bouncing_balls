const canvas = document.querySelector('canvas');
const count = document.querySelector('p');
const final = document.querySelector('h1');
const box = document.querySelector('.container');
const play = document.querySelector('button');
const countdown = document.querySelector('.countdown');

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

let n, ballpool, stop, opacity = 0; 

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

canvas.onclick = function(event){
    for(let i = 0; i < ballpool.length; i++){
        let xdiff = Math.abs(event.clientX - ballpool[i].x);
        let ydiff = Math.abs(event.clientY - ballpool[i].y);
        if(xdiff <= ballpool[i].size && ydiff <= ballpool[i].size && ballpool[i].exist){
            ballpool[i].exist = false;
            n--;
        }
    }
}

play.onclick = function(){
    box.style.display = "none";
    interval();
}

function loop(){
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);
    count.innerText = "Balls: " + n;
    for(let i = 0; i < ballpool.length; i++){
        if(ballpool[i].exist){
            ballpool[i].draw();
            ballpool[i].update();
            ballpool[i].collisionDetect();
        }
    }
    if(n > 0 && stop > 0){
        requestAnimationFrame(loop);
    }
    else if(n == 0 && stop > 0){
        stop--;
        requestAnimationFrame(loop);
    }
    else{
        end();
    }
}

function startGame(){
    ballpool = [];
    n = Math.floor(width/30);
    n = random(n, n+10);
    stop = 30;
    while(ballpool.length < n){
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
    loop();
}

function end(){
    box.style.display ="flex";
}

function interval(counter=10){
    countdown.textContent = `${Math.round(counter/2)}`;
    opacity = (opacity == 0) ? 1 : 0;
    countdown.style.opacity = opacity;
    if(counter/2 > 0){
        setTimeout(interval, 500, counter-1);
    }
    else{
        countdown.style.opacity = "0";
        startGame();
    }
}

window.onload = function(){
    interval();
};