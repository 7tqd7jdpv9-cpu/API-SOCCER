const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const ball = {
    x: 0,
    y: 0,
    r: 20
};

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 80;
}

playBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";

    resizeCanvas();
    resetBall();

    requestAnimationFrame(gameLoop);
});

function drawPitch() {
    // 芝生
    ctx.fillStyle = "#1d8f45";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // センターライン
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;

    for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // ゴール
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;

    ctx.strokeRect(
        canvas.width / 2 - 80,
        25,
        160,
        60
    );
}

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ccc";
    ctx.stroke();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPitch();
    drawBall();

    requestAnimationFrame(gameLoop);
}
