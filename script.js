/* ==========================================================
   BOTÕES DO MENU
========================================================== */

// NOVO JOGO
document.getElementById("startGame").addEventListener("click", () => {

    // Apaga o jogo anterior
    localStorage.removeItem("neonCitySave");

    // Reseta o jogador
    player.x = 1200;
    player.y = 1500;

    player.money = 2500;
    player.wanted = 0;
    player.inCar = false;
    player.car = null;
    player.health = 100;
    player.fuel = 100;

    currentMission = 0;
    gameTime = 12 * 60;

    // Atualiza missão
    updateMission();

    // Esconde menu
    document.getElementById("menu").style.display = "none";

    // Mostra jogo
    canvas.style.display = "block";

    // Mostra HUD
    document.getElementById("hud").style.display = "block";

    // Mensagens
    notify("🌆 Bem-vindo à NEON CITY!");

    setTimeout(() => {
        notify("🚶 Explore a cidade.");
    }, 1000);

    setTimeout(() => {
        notify("🚗 Encontre um veículo.");
    }, 2000);

    // Começa o jogo
    if (!gameStarted) {
        gameStarted = true;
        gameLoop();
    }

});


// CONTINUAR
document.getElementById("continueGame").addEventListener("click", () => {

    const loaded = loadGame();

    if (!loaded) {

        alert("Nenhum jogo salvo encontrado.");

        return;
    }

    document.getElementById("menu").style.display = "none";

    canvas.style.display = "block";

    document.getElementById("hud").style.display = "block";

    notify("💾 Jogo carregado!");

    if (!gameStarted) {

        gameStarted = true;

        gameLoop();

    }

});


// ==========================================================
// CONTROLE DO LOOP
// ==========================================================

let gameStarted = false;


/* ==========================================================
   GAME LOOP
========================================================== */

function gameLoop() {

    if (!gameStarted) {
        return;
    }

    if (!paused) {

        if (player.inCar) {

            updateCar();

        } else {

            movePlayer();

        }

        updateCamera();

        updateTime();

        updateWanted();

        updateHUD();

        drawMinimap();

        render();

    }

    requestAnimationFrame(gameLoop);

}


/* ==========================================================
   AUTOSAVE
========================================================== */

setInterval(() => {

    if (
        gameStarted &&
        !paused
    ) {

        saveGame();

    }

}, 30000);