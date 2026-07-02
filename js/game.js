const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: canvas.width/2,
    y: canvas.height-120,
    r:35
};

playBtn.onclick = ()=>{

    menu.style.display="none";
    game.style.display="block";

    draw();

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    //芝
    ctx.fillStyle="#146b3a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //ゴール
    ctx.strokeStyle="white";
    ctx.lineWidth=6;

    ctx.strokeRect(
        canvas.width/2-90,
        40,
        180,
        70
    );

    //ボール
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fill();

    requestAnimationFrame(draw);

}
