const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//====================
// プレイヤー
//====================
const player = {
    x: canvas.width / 2,
    y: canvas.height - 120,
    radius: 25,
    speed: 5,
    color: "#0066ff"
};

//====================
// ボール
//====================
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    dx: 0,
    dy: 0,
    friction: 0.98
};

//====================
// ゴール
//====================
const goal = {
    x: canvas.width / 2 - 80,
    y: 20,
    width: 160,
    height: 20
};

let score = 0;

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

//====================
// 更新
//====================
function update(){

    // プレイヤー移動
    if(keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
    if(keys["ArrowRight"] || keys["d"]) player.x += player.speed;
    if(keys["ArrowUp"] || keys["w"]) player.y -= player.speed;
    if(keys["ArrowDown"] || keys["s"]) player.y += player.speed;

    // 壁
    player.x = Math.max(player.radius, Math.min(canvas.width-player.radius,player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height-player.radius,player.y));

    // プレイヤーとボール
    const dx = ball.x-player.x;
    const dy = ball.y-player.y;
    const dist = Math.sqrt(dx*dx+dy*dy);

    if(dist < player.radius + ball.radius){

        const angle = Math.atan2(dy,dx);

        ball.dx = Math.cos(angle)*8;
        ball.dy = Math.sin(angle)*8;

    }

    // ボール
    ball.x += ball.dx;
    ball.y += ball.dy;

    ball.dx *= ball.friction;
    ball.dy *= ball.friction;

    // 壁反射
    if(ball.x-ball.radius<0){
        ball.x=ball.radius;
        ball.dx*=-1;
    }

    if(ball.x+ball.radius>canvas.width){
        ball.x=canvas.width-ball.radius;
        ball.dx*=-1;
    }

    if(ball.y+ball.radius>canvas.height){
        ball.y=canvas.height-ball.radius;
        ball.dy*=-1;
    }

    if(ball.y-ball.radius<0){
        ball.y=ball.radius;
        ball.dy*=-1;
    }

    // ゴール
    if(
        ball.x>goal.x &&
        ball.x<goal.x+goal.width &&
        ball.y-ball.radius<goal.y+goal.height
    ){

        score++;

        player.x = canvas.width/2;
        player.y = canvas.height-120;

        ball.x = canvas.width/2;
        ball.y = canvas.height/2;

        ball.dx = 0;
        ball.dy = 0;

    }

}

//====================
// 描画
//====================
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 芝
    ctx.fillStyle="#3fa34d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // センターライン
    ctx.strokeStyle="white";
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.stroke();

    // ゴール
    ctx.fillStyle="white";
    ctx.fillRect(goal.x,goal.y,goal.width,goal.height);

    // プレイヤー
    ctx.beginPath();
    ctx.fillStyle=player.color;
    ctx.arc(player.x,player.y,player.radius,0,Math.PI*2);
    ctx.fill();

    // ボール
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fill();

    // スコア
    ctx.fillStyle="white";
    ctx.font="30px Arial";
    ctx.fillText("Score : "+score,20,40);

}

//====================
// ループ
//====================
function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();