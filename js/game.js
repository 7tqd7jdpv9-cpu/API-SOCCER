const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

playBtn.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";
});
