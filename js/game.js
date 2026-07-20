const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball;
let dragging = false;

let vx = 0;
let vy = 0;

function draw() {

    // 背景
    ctx.fillStyle = "#1d8f45";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ゴール
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(canvas.width / 2 - 80, 30, 160, 60);

    // ボールを動かす
    ball.x += vx;
    ball.y += vy;

    // 摩擦
    vx *= 0.98;
    vy *= 0.98;

    if (Math.abs(vx) < 0.05) vx = 0;
    if (Math.abs(vy) < 0.05) vy = 0;

    // ボール
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
}

playBtn.onclick = () => {

    menu.style.display = "none";
    game.style.display = "block";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ball = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        r: 25
    };

    draw();

    canvas.addEventListener("touchstart", (e) => {

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const dx = touch.clientX - rect.left - ball.x;
        const dy = touch.clientY - rect.top - ball.y;

        if (Math.sqrt(dx * dx + dy * dy) <= ball.r + 20) {
            dragging = true;
            vx = 0;
            vy = 0;
        }

    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {

        if (!dragging) return;

        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        ball.x = touch.clientX - rect.left;
        ball.y = touch.clientY - rect.top;

    }, { passive: false });

    canvas.addEventListener("touchend", () => {

        if (!dragging) return;

        dragging = false;

        vx = (canvas.width / 2 - ball.x) * 0.15;
        vy = (canvas.height - 100 - ball.y) * 0.15;

    });

};