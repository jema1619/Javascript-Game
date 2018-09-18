
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#9b9b9b";
ctx.font = "26px fantasy";
ctx.fillText("Press the play button to play.", canvas.width/2-150, canvas.height/2);
var danger = [];
var lives = 3;
var score = 0;
var gamePlay = true;
var livesLeft = document.getElementById("lives");
var scoreHtml = document.getElementById("score");
var sounddanger = document.getElementById("die");
var catchMe = document.getElementById("catch");

var imgdanger = new Image();
imgdanger.src = "images/danger-fish.png";

for (var i =0; i<8; i++) {
danger.push({
    x: -200,
    y: 65*i,
    w: 65,
    h: 28,
    speed: Math.random() +1,
    draw: function(){
        ctx.drawImage(imgdanger, this.x-20, this.y-15);
    },
    move: function() {
    this.x = this.x + this.speed;
    if (this.x > canvas.width+this.w) {
        this.x = -this.w;
    }
    }
})
};



function dangerHit(danger) {
        if (
        fish.x < danger.x + danger.w && 
        danger.x < fish.x + fish.w && 
        fish.y < danger.y + danger.h && 
        danger.y < fish.y + fish.h
        ){
               fish.x = 0;
               fish.y = 0;
               fish.w = 45;
               fish.h = 30;
               sounddanger.play();
               livesLeft.innerText = --lives;
         } if(lives == 0) {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.fillStyle = "#9b9b9b";
            ctx.font = "26px Fantasy";
            ctx.fillText("Game Over! Refresh the page to play again", canvas.width/2-250, canvas.height/2);
            gamePlay=false;
        }
};



var imgFish = new Image();
imgFish.src = "images/fish-1.png"

var fish = {
    x: 200,
    y: 300,
    w: 45,
    h: 30,
    lkey:false,
    speed: 3,
    draw: function(){
        ctx.drawImage(imgFish, fish.x, fish.y);
    },
 /*
The following 21 lines of code where adapted from Edwin DizzleMac's code title: Sprites Game.
Link: http://codepen.io/Edwin-Dizzle/pen/pjwqc?editors=0010
Date of retrieval: 11th May.
*/
    move: function(){ 
            if (37 in keysDown) {
                fish.x -= fish.speed;
                fish.lkey= true;
            }
            if (38 in keysDown) fish.y -= fish.speed;
            if (39 in keysDown) {
                fish.x += fish.speed;
                fish.lkey = false;
            }
            if (40 in keysDown) fish.y += fish.speed;
            if (fish.x<0 && fish.lkey) fish.x=0;
                else if (fish.x>canvas.width) fish.x = 0-fish.w;
                else if (fish.y<0) fish.y=0;
                else if (fish.y>canvas.height-fish.h) {
                        fish.y=canvas.height-fish.h;
                }
        }
};
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});


var img = new Image();
img.src = "images/mini-diamond.png";

var diamond ={
	x: (Math.random() * (canvas.width -20)),
	y: (Math.random() * (canvas.height -20)),
    w: 20,
    h: 20,
    draw: function(){
    ctx.drawImage(img, diamond.x-10, diamond.y-2);
    },
    move: function() {
    if (
        fish.x < diamond.x + diamond.w && 
        diamond.x < fish.x + fish.w && 
        fish.y < diamond.y + diamond.h && 
        diamond.y < fish.y + fish.h
    )  {
        diamond.x = (Math.random() * (canvas.width -diamond.w));
        diamond.y = (Math.random() * (canvas.height -diamond.h));
        catchMe.play();
        scoreHtml.innerText = ++score;
    }
    if (score == 100) {
        ctx.fillStyle = "#9b9b9b";
        ctx.font = "22px Fantasy";
        ctx.fillText("Congrats, you've catch 100 diamonds!", canvas.width/2-150, canvas.height/2);
    }
    }
};

function start() {
  ID = window.requestAnimationFrame(play);
};

function stop() {
  window.cancelAnimationFrame(ID);
};

/*
The following 3 lines of code we learned in previous course, however in JQuery. So we already know the principle how to do it in Javascript. We controlled the code here:  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_class
Date of retrieval: 28th May.
*/

function instruction() {
   var x = document.getElementById('show');
   x.classList.toggle("menu");
}

function play () {
    if(gamePlay == true){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    fish.draw();
    diamond.draw();
    diamond.move();
    fish.move();
    for (var i =0; i<danger.length; i++) {
       danger[i].draw();
       danger[i].move(); 
       dangerHit(danger[i], i);
    };
    start();
        }
};
