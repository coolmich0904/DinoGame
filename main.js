var canvas =  document.getElementById('canvas');
// @ts-ignore
var ctx = canvas.getContext('2d');

// @ts-ignore
canvas.width = window.innerWidth - 100;
// @ts-ignore
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'cactus.png';


var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width,this.height); 
        ctx.drawImage(img2, this.x, this.y);
    }
}

dino.draw();

var img1 = new Image();
img1.src = 'pig.png';


class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200   ;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width,this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusMany = [];
var jumpTimer = 0;
var animation;

function RunningFrame() {
    animation = requestAnimationFrame(RunningFrame);
    timer++;

    // @ts-ignore
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 320 === 0){
        var cactus = new Cactus();
        cactusMany.push(cactus);
    }

    cactusMany.forEach((a, i, o)=>{
        // x coordinate < 0 => remove
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x--;

        collisionChk(dino, a); // Collision checking

        a.draw();
    })
   
    if(jump == true) {
        dino.y--   ;
        jumpTimer++;
    }

    if(jump == false) {
        if(dino.y < 200) {
            dino.y++;
            jumpTimer = 0;
        }
    }

    if(jumpTimer > 100) {
        jump = false;
    }

   // dino.x++;
    dino.draw();
}

RunningFrame();

// Collision Check
function collisionChk(dino, cactus){
    var diffX = cactus.x - (dino.x + dino.width);
    var diffY = cactus.y - (dino.y + dino.height);
    if(diffX < 0 && diffY < 0) {
        // @ts-ignore
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code ==='Space') {
        jump = true;
    }
}) 