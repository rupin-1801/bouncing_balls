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

let testball = new Ball(300, 100, 20, 20, 'red', 20);
// console.log(testball.color, testball.size, testball.x, testball.y);
testball.draw();