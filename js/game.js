const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

playBtn.onclick = () => {
    menu.style.display = "none";
    game.style.display = "block";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 芝生
    ctx.fillStyle = "#1d8f45";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ゴール
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(canvas.width/2 - 80, 30, 160, 60);

    // ボール
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(canvas.width/2, canvas.height - 100, 25, 0, Math.PI * 2);
    ctx.fill();
};
