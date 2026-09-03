/* ==========================================================
   NEON CITY
   OPEN WORLD 2D
========================================================== */


/* ==========================================================
   CANVAS
========================================================== */

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

const mapCanvas =
    document.getElementById("mapCanvas");

const mapCtx =
    mapCanvas.getContext("2d");


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* ==========================================================
   MUNDO
========================================================== */

const WORLD_WIDTH = 5000;
const WORLD_HEIGHT = 5000;


/* ==========================================================
   CÂMERA
========================================================== */

const camera = {

    x: 0,
    y: 0
};


/* ==========================================================
   JOGADOR
========================================================== */

const player = {

    x: 1200,
    y: 1500,

    width: 25,
    height: 25,

    speed: 3.2,

    angle: 0,

    money: 2500,

    wanted: 0,

    inCar: false,

    car: null,

    health: 100
};


/* ==========================================================
   TECLAS
========================================================== */

const keys = {};

window.addEventListener(
    "keydown",
    e => {

        keys[e.key.toLowerCase()] = true;

        if (e.key.toLowerCase() === "e") {

            enterExitCar();
        }

        if (e.key.toLowerCase() === "f") {

            missionInteraction();
        }

        if (e.key === "Escape") {

            togglePause();
        }

    }
);


window.addEventListener(
    "keyup",
    e => {

        keys[e.key.toLowerCase()] = false;

    }
);


/* ==========================================================
   PRÉDIOS
========================================================== */

const buildings = [];

function generateBuildings() {

    buildings.length = 0;

    for (
        let x = 150;
        x < WORLD_WIDTH - 300;
        x += 400
    ) {

        for (
            let y = 150;
            y < WORLD_HEIGHT - 300;
            y += 400
        ) {

            // espaço para ruas

            const bx =
                x + 35;

            const by =
                y + 35;

            const width =
                300;

            const height =
                300;

            buildings.push({

                x: bx,
                y: by,

                width,
                height,

                height3d:
                    20 +
                    Math.random() * 60,

                color:
                    randomBuildingColor()

            });

        }
    }
}


function randomBuildingColor() {

    const colors = [

        "#343944",
        "#3d414b",
        "#454950",
        "#30343d",
        "#51545c"

    ];

    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}


generateBuildings();


/* ==========================================================
   CARROS
========================================================== */

const cars = [];


function generateCars() {

    cars.length = 0;

    for (let i = 0; i < 50; i++) {

        const horizontal =
            Math.random() > .5;

        let x;
        let y;

        if (horizontal) {

            x =
                Math.random() *
                WORLD_WIDTH;

            y =
                Math.round(
                    Math.random() *
                    (WORLD_HEIGHT / 400)
                ) * 400 +
                200;

        } else {

            x =
                Math.round(
                    Math.random() *
                    (WORLD_WIDTH / 400)
                ) * 400 +
                200;

            y =
                Math.random() *
                WORLD_HEIGHT;
        }

        cars.push({

            x,
            y,

            width: 55,
            height: 30,

            angle:
                horizontal
                ? 0
                : Math.PI / 2,

            speed:
                0,

            maxSpeed:
                8,

            acceleration:
                .18,

            friction:
                .94,

            color:
                randomCarColor(),

            occupied:
                false,

            type:
                randomCarType()

        });

    }
}


function randomCarColor() {

    const colors = [

        "#d93636",
        "#246bce",
        "#dedede",
        "#151515",
        "#e8b63c",
        "#38a86b",
        "#8c4bc4"

    ];

    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}


function randomCarType() {

    const types = [

        "COUPE",
        "SEDAN",
        "SPORT",
        "SUV"

    ];

    return types[
        Math.floor(
            Math.random() *
            types.length
        )
    ];
}


generateCars();


/* ==========================================================
   PALMEIRAS
========================================================== */

const trees = [];


for (let i = 0; i < 100; i++) {

    trees.push({

        x:
            Math.random() *
            WORLD_WIDTH,

        y:
            Math.random() *
            WORLD_HEIGHT,

        size:
            15 +
            Math.random() * 15

    });

}


/* ==========================================================
   MISSÕES
========================================================== */

const missions = [

    {
        title:
            "PRIMEIRO PASSEIO",

        description:
            "Encontre um veículo e explore a cidade.",

        reward:
            500,

        completed:
            false
    },

    {
        title:
            "CORRIDA NOTURNA",

        description:
            "Dirija até a região da praia.",

        reward:
            1000,

        completed:
            false
    },

    {
        title:
            "ENTREGA",

        description:
            "Leve o carro até o ponto marcado.",

        reward:
            1500,

        completed:
            false
    }

];


let currentMission = 0;


/* ==========================================================
   CIDADE
========================================================== */

const cityZones = [

    {
        name: "CENTRO",

        x: 500,
        y: 500,

        width: 2000,
        height: 2000,

        color: "#777"
    },

    {
        name: "PRAIA",

        x: 0,
        y: 4000,

        width: 5000,
        height: 1000,

        color: "#e3d19b"
    },

    {
        name: "PARQUE",

        x: 2800,
        y: 700,

        width: 1200,
        height: 1100,

        color: "#385b3d"
    }

];


/* ==========================================================
   FUNDO
========================================================== */

function drawWorld() {

    ctx.fillStyle =
        "#39493a";

    ctx.fillRect(
        0,
        0,
        WORLD_WIDTH,
        WORLD_HEIGHT
    );


    /* =====================
       PRAIA
    ===================== */

    ctx.fillStyle =
        "#d9c58f";

    ctx.fillRect(
        0,
        4000,
        WORLD_WIDTH,
        1000
    );


    /* =====================
       MAR
    ===================== */

    ctx.fillStyle =
        "#2387a7";

    ctx.fillRect(
        0,
        4550,
        WORLD_WIDTH,
        450
    );


    /* =====================
       PARQUE
    ===================== */

    ctx.fillStyle =
        "#315a38";

    ctx.fillRect(
        2800,
        700,
        1200,
        1100
    );


    /* =====================
       RUAS
    ===================== */

    ctx.fillStyle =
        "#25282b";


    for (
        let x = 0;
        x < WORLD_WIDTH;
        x += 400
    ) {

        ctx.fillRect(
            x,
            0,
            100,
            WORLD_HEIGHT
        );

    }


    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y += 400
    ) {

        ctx.fillRect(
            0,
            y,
            WORLD_WIDTH,
            100
        );

    }


    /* =====================
       LINHAS DAS RUAS
    ===================== */

    ctx.strokeStyle =
        "#d2b84c";

    ctx.lineWidth = 3;

    ctx.setLineDash([
        25,
        25
    ]);


    for (
        let x = 50;
        x < WORLD_WIDTH;
        x += 400
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            WORLD_HEIGHT
        );

        ctx.stroke();

    }


    for (
        let y = 50;
        y < WORLD_HEIGHT;
        y += 400
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            WORLD_WIDTH,
            y
        );

        ctx.stroke();

    }


    ctx.setLineDash([]);


    /* =====================
       PRÉDIOS
    ===================== */

    buildings.forEach(
        drawBuilding
    );


    /* =====================
       ÁRVORES
    ===================== */

    trees.forEach(
        drawTree
    );

}


/* ==========================================================
   PRÉDIO
========================================================== */

function drawBuilding(building) {

    const b =
        building;

    ctx.fillStyle =
        "rgba(0,0,0,.25)";

    ctx.fillRect(
        b.x + 15,
        b.y + 20,
        b.width,
        b.height
    );


    ctx.fillStyle =
        b.color;

    ctx.fillRect(
        b.x,
        b.y,
        b.width,
        b.height
    );


    /* topo */

    ctx.fillStyle =
        "#565b64";

    ctx.fillRect(
        b.x,
        b.y,
        b.width,
        15
    );


    /* janelas */

    const columns = 7;
    const rows = 7;

    for (
        let col = 0;
        col < columns;
        col++
    ) {

        for (
            let row = 0;
            row < rows;
            row++
        ) {

            const wx =
                b.x +
                25 +
                col * 38;

            const wy =
                b.y +
                35 +
                row * 37;

            ctx.fillStyle =
                isNight()
                ? "#d9b95c"
                : "#7b9ba4";

            ctx.fillRect(
                wx,
                wy,
                18,
                12
            );

        }

    }

}


/* ==========================================================
   ÁRVORE
========================================================== */

function drawTree(tree) {

    ctx.fillStyle =
        "#553d27";

    ctx.fillRect(
        tree.x - 3,
        tree.y,
        6,
        tree.size
    );


    ctx.beginPath();

    ctx.fillStyle =
        "#21482b";

    ctx.arc(
        tree.x,
        tree.y,
        tree.size,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* ==========================================================
   CARROS
========================================================== */

function drawCar(car) {

    ctx.save();

    ctx.translate(
        car.x,
        car.y
    );

    ctx.rotate(
        car.angle
    );


    /* sombra */

    ctx.fillStyle =
        "rgba(0,0,0,.35)";

    ctx.fillRect(
        -car.width / 2 + 5,
        -car.height / 2 + 6,
        car.width,
        car.height
    );


    /* corpo */

    ctx.fillStyle =
        car.color;

    ctx.fillRect(
        -car.width / 2,
        -car.height / 2,
        car.width,
        car.height
    );


    /* teto */

    ctx.fillStyle =
        "#20242a";

    ctx.fillRect(
        -15,
        -10,
        30,
        20
    );


    /* vidro */

    ctx.fillStyle =
        "#75b6c9";

    ctx.fillRect(
        -12,
        -8,
        24,
        16
    );


    /* rodas */

    ctx.fillStyle =
        "#111";

    ctx.fillRect(
        -20,
        -17,
        12,
        7
    );

    ctx.fillRect(
        8,
        -17,
        12,
        7
    );

    ctx.fillRect(
        -20,
        10,
        12,
        7
    );

    ctx.fillRect(
        8,
        10,
        12,
        7
    );


    ctx.restore();

}


/* ==========================================================
   JOGADOR
========================================================== */

function drawPlayer() {

    if (player.inCar)
        return;


    ctx.save();

    ctx.translate(
        player.x,
        player.y
    );

    ctx.rotate(
        player.angle
    );


    /* sombra */

    ctx.fillStyle =
        "rgba(0,0,0,.35)";

    ctx.beginPath();

    ctx.ellipse(
        0,
        12,
        13,
        7,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* corpo */

    ctx.fillStyle =
        "#ff3366";

    ctx.fillRect(
        -9,
        -5,
        18,
        18
    );


    /* cabeça */

    ctx.fillStyle =
        "#d69a78";

    ctx.beginPath();

    ctx.arc(
        0,
        -12,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* cabelo */

    ctx.fillStyle =
        "#171717";

    ctx.beginPath();

    ctx.arc(
        0,
        -15,
        8,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();

}


/* ==========================================================
   COLISÃO
========================================================== */

function collidesBuilding(x, y) {

    const size =
        player.inCar
        ? 25
        : 12;

    for (
        const b of buildings
    ) {

        if (

            x + size >
            b.x &&

            x - size <
            b.x + b.width &&

            y + size >
            b.y &&

            y - size <
            b.y + b.height

        ) {

            return true;

        }

    }

    return false;

}


/* ==========================================================
   MOVIMENTO DO JOGADOR
========================================================== */

function movePlayer() {

    if (player.inCar)
        return;


    let dx = 0;
    let dy = 0;


    if (keys["w"])
        dy--;

    if (keys["s"])
        dy++;

    if (keys["a"])
        dx--;

    if (keys["d"])
        dx++;


    if (dx === 0 && dy === 0)
        return;


    const length =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    dx /= length;
    dy /= length;


    let speed =
        player.speed;


    if (keys["shift"])
        speed *= 1.7;


    const nx =
        player.x +
        dx * speed;

    const ny =
        player.y +
        dy * speed;


    if (
        !collidesBuilding(
            nx,
            player.y
        )
    ) {

        player.x = nx;

    }


    if (
        !collidesBuilding(
            player.x,
            ny
        )
    ) {

        player.y = ny;

    }


    player.angle =
        Math.atan2(
            dy,
            dx
        );

}


/* ==========================================================
   VEÍCULO
========================================================== */

function updateCar() {

    const car =
        player.car;

    if (!car)
        return;


    if (keys["w"]) {

        car.speed +=
            car.acceleration;

    }


    if (keys["s"]) {

        car.speed -=
            car.acceleration * .7;

    }


    car.speed =
        Math.max(
            -3,
            Math.min(
                car.maxSpeed,
                car.speed
            )
        );


    if (
        !keys["w"] &&
        !keys["s"]
    ) {

        car.speed *=
            car.friction;

    }


    if (Math.abs(car.speed) > .1) {

        const steering =
            .045 *
            Math.sign(car.speed);


        if (keys["a"])
            car.angle -= steering;

        if (keys["d"])
            car.angle += steering;

    }


    const nx =
        car.x +
        Math.cos(car.angle) *
        car.speed;

    const ny =
        car.y +
        Math.sin(car.angle) *
        car.speed;


    if (
        !collidesBuilding(
            nx,
            ny
        )
    ) {

        car.x = nx;
        car.y = ny;

    } else {

        car.speed *= -.3;

        player.wanted =
            Math.min(
                5,
                player.wanted + .05
            );

    }


    player.x =
        car.x;

    player.y =
        car.y;


    if (player.inCar) {

        player.angle =
            car.angle;

    }


    /* combustível */

    player.fuel -=
        Math.abs(
            car.speed
        ) * .003;


    if (player.fuel < 0)
        player.fuel = 0;

}


/* ==========================================================
   ENTRAR / SAIR
========================================================== */

function enterExitCar() {

    if (!player.inCar) {

        let nearest =
            null;

        let distance =
            Infinity;


        for (
            const car of cars
        ) {

            if (car.occupied)
                continue;


            const dx =
                car.x -
                player.x;

            const dy =
                car.y -
                player.y;

            const d =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                d < 70 &&
                d < distance
            ) {

                nearest =
                    car;

                distance =
                    d;

            }

        }


        if (nearest) {

            player.inCar =
                true;

            player.car =
                nearest;

            nearest.occupied =
                true;

            player.fuel =
                100;

            notify(
                "🚗 Você entrou no veículo."
            );

        }

    } else {

        const car =
            player.car;


        player.inCar =
            false;

        car.occupied =
            false;

        player.car =
            null;


        player.x =
            car.x +
            Math.cos(
                car.angle +
                Math.PI / 2
            ) * 40;


        player.y =
            car.y +
            Math.sin(
                car.angle +
                Math.PI / 2
            ) * 40;


        notify(
            "🚶 Você saiu do veículo."
        );

    }

}


/* ==========================================================
   MISSÕES
========================================================== */

function missionInteraction() {

    const mission =
        missions[currentMission];


    if (!mission)
        return;


    if (
        currentMission === 0
    ) {

        if (player.inCar) {

            completeMission();

        } else {

            notify(
                "🚗 Entre em um veículo primeiro."
            );

        }

    }


    else if (
        currentMission === 1
    ) {

        if (
            player.y >
            4000
        ) {

            completeMission();

        } else {

            notify(
                "🌴 Vá até a praia."
            );

        }

    }


    else if (
        currentMission === 2
    ) {

        if (
            player.x >
            4000 &&
            player.y >
            3500
        ) {

            completeMission();

        } else {

            notify(
                "📍 Vá até o ponto de entrega."
            );

        }

    }

}


function completeMission() {

    const mission =
        missions[currentMission];


    mission.completed =
        true;


    player.money +=
        mission.reward;


    notify(
        "✓ MISSÃO CONCLUÍDA +$" +
        mission.reward
    );


    currentMission++;


    if (
        currentMission >=
        missions.length
    ) {

        document.getElementById(
            "missionTitle"
        ).innerText =
            "MUNDO ABERTO";

        document.getElementById(
            "missionDescription"
        ).innerText =
            "Explore a cidade livremente.";

    } else {

        updateMission();

    }

    updateHUD();

}


/* ==========================================================
   MISSÃO HUD
========================================================== */

function updateMission() {

    const mission =
        missions[currentMission];


    if (!mission)
        return;


    document.getElementById(
        "missionTitle"
    ).innerText =
        mission.title;


    document.getElementById(
        "missionDescription"
    ).innerText =
        mission.description;

}


updateMission();


/* ==========================================================
   CÂMERA
========================================================== */

function updateCamera() {

    camera.x =
        player.x -
        canvas.width / 2;

    camera.y =
        player.y -
        canvas.height / 2;


    camera.x =
        Math.max(
            0,
            Math.min(
                WORLD_WIDTH -
                canvas.width,
                camera.x
            )
        );


    camera.y =
        Math.max(
            0,
            Math.min(
                WORLD_HEIGHT -
                canvas.height,
                camera.y
            )
        );

}


/* ==========================================================
   DESENHAR
========================================================== */

function render() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();

    ctx.translate(
        -camera.x,
        -camera.y
    );


    drawWorld();


    cars.forEach(
        drawCar
    );


    drawPlayer();


    drawMissionMarker();


    ctx.restore();


    drawNightOverlay();

}


/* ==========================================================
   MARCADOR
========================================================== */

function drawMissionMarker() {

    let x;
    let y;


    if (
        currentMission === 1
    ) {

        x = 2500;
        y = 4200;

    }

    else if (
        currentMission === 2
    ) {

        x = 4300;
        y = 3900;

    }

    else {

        return;

    }


    ctx.beginPath();

    ctx.strokeStyle =
        "#ff3366";

    ctx.lineWidth = 5;

    ctx.arc(
        x,
        y,
        30 +
        Math.sin(
            Date.now() / 200
        ) * 5,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.fillStyle =
        "#ff3366";

    ctx.font =
        "bold 16px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "MISSÃO",
        x,
        y - 45
    );

}


/* ==========================================================
   DIA / NOITE
========================================================== */

let gameTime = 12 * 60;


function updateTime() {

    gameTime += .04;

    if (
        gameTime >=
        24 * 60
    ) {

        gameTime = 0;

    }


    const hours =
        Math.floor(
            gameTime / 60
        );

    const minutes =
        Math.floor(
            gameTime % 60
        );


    document.getElementById(
        "clock"
    ).innerText =

        String(hours)
            .padStart(2, "0")

        + ":" +

        String(minutes)
            .padStart(2, "0");

}


function isNight() {

    const hour =
        gameTime / 60;

    return (
        hour >= 19 ||
        hour <= 6
    );

}


function drawNightOverlay() {

    if (!isNight())
        return;


    let alpha = .25;


    if (
        gameTime / 60 >= 22 ||
        gameTime / 60 <= 4
    ) {

        alpha = .45;

    }


    ctx.fillStyle =
        `rgba(10,20,70,${alpha})`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/* ==========================================================
   MINIMAPA
========================================================== */

function drawMinimap() {

    mapCtx.clearRect(
        0,
        0,
        180,
        180
    );


    const scale =
        180 / WORLD_WIDTH;


    mapCtx.fillStyle =
        "#344536";

    mapCtx.fillRect(
        0,
        0,
        180,
        180
    );


    /* praia */

    mapCtx.fillStyle =
        "#d4c087";

    mapCtx.fillRect(
        0,
        144,
        180,
        36
    );


    /* mar */

    mapCtx.fillStyle =
        "#2183a0";

    mapCtx.fillRect(
        0,
        165,
        180,
        15
    );


    /* ruas */

    mapCtx.fillStyle =
        "#292d30";


    for (
        let x = 0;
        x < WORLD_WIDTH;
        x += 400
    ) {

        mapCtx.fillRect(
            x * scale,
            0,
            100 * scale,
            180
        );

    }


    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y += 400
    ) {

        mapCtx.fillRect(
            0,
            y * scale,
            180,
            100 * scale
        );

    }


    /* carros */

    mapCtx.fillStyle =
        "#aaa";


    cars.forEach(
        car => {

            mapCtx.fillRect(
                car.x * scale - 1,
                car.y * scale - 1,
                2,
                2
            );

        }
    );


    /* jogador */

    mapCtx.fillStyle =
        "#ff3366";

    mapCtx.beginPath();

    mapCtx.arc(
        player.x * scale,
        player.y * scale,
        4,
        0,
        Math.PI * 2
    );

    mapCtx.fill();

}


/* ==========================================================
   HUD
========================================================== */

function updateHUD() {

    document.getElementById(
        "money"
    ).innerText =
        player.money.toLocaleString(
            "en-US"
        );


    let stars = "";

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        stars +=
            i < Math.ceil(player.wanted)
            ? "★ "
            : "☆ ";

    }


    document.getElementById(
        "stars"
    ).innerText =
        stars;


    if (player.inCar) {

        document.getElementById(
            "vehicleHUD"
        ).style.display =
            "block";


        const car =
            player.car;


        document.getElementById(
            "speed"
        ).innerText =
            Math.round(
                Math.abs(
                    car.speed
                ) * 18
            );


        document.getElementById(
            "fuel"
        ).style.width =
            player.fuel + "%";

    } else {

        document.getElementById(
            "vehicleHUD"
        ).style.display =
            "none";

    }

}


/* ==========================================================
   PROCURADO
========================================================== */

function updateWanted() {

    if (
        player.wanted > 0
    ) {

        player.wanted -=
            .002;

    }


    if (
        player.wanted < 0
    ) {

        player.wanted = 0;

    }

}


/* ==========================================================
   NOTIFICAÇÕES
========================================================== */

function notify(text) {

    const container =
        document.getElementById(
            "notifications"
        );


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "notification";


    notification.innerText =
        text;


    container.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.remove();

        },
        3000
    );

}


/* ==========================================================
   SALVAR
========================================================== */

function saveGame() {

    const save = {

        player: {

            x: player.x,
            y: player.y,

            money:
                player.money,

            wanted:
                player.wanted

        },

        mission:
            currentMission,

        time:
            gameTime

    };


    localStorage.setItem(
        "neonCitySave",
        JSON.stringify(save)
    );


    notify(
        "💾 Jogo salvo."
    );

}


/* ==========================================================
   CARREGAR
========================================================== */

function loadGame() {

    const data =
        localStorage.getItem(
            "neonCitySave"
        );


    if (!data)
        return false;


    const save =
        JSON.parse(data);


    player.x =
        save.player.x;

    player.y =
        save.player.y;

    player.money =
        save.player.money;

    player.wanted =
        save.player.wanted;

    currentMission =
        save.mission;

    gameTime =
        save.time;


    updateMission();


    return true;

}


/* ==========================================================
   PAUSA
========================================================== */

let paused = false;


function togglePause() {

    if (
        document.getElementById(
            "gameCanvas"
        ).style.display !== "block"
    )
        return;


    paused =
        !paused;


    document.getElementById(
        "pause"
    ).style.display =
        paused
        ? "flex"
        : "none";

}


document.getElementById(
    "resume"
).onclick = () => {

    paused = false;

    document.getElementById(
        "pause"
    ).style.display =
        "none";

};


document.getElementById(
    "save"
).onclick =
    saveGame;


document.getElementById(
    "exit"
).onclick = () => {

    location.reload();

};


/* ==========================================================
   INICIAR JOGO
========================================================== */

function startGame() {

    document.getElementById(
        "menu"
    ).style.display =
        "none";


    canvas.style.display =
        "block";


    document.getElementById(
        "hud"
    ).style.display =
        "block";


    notify(
        "🌆 Bem-vindo à NEON CITY."
    );


    notify(
        "🚗 Encontre um carro."
    );


    gameLoop();

}


/* ==========================================================
   BOTÕES
========================================================== */

document.getElementById(
    "startGame"
).onclick = () => {

    localStorage.removeItem(
        "neonCitySave"
    );

    location.reload();

};


document.getElementById(
    "continueGame"
).onclick = () => {

    if (
        loadGame()
    ) {

        startGame();

        notify(
            "💾 Jogo carregado."
        );

    } else {

        notify(
            "Nenhum jogo salvo."
        );

    }

};


/* ==========================================================
   GAME LOOP
========================================================== */

function gameLoop() {

    if (!paused) {

        if (
            player.inCar
        ) {

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


    requestAnimationFrame(
        gameLoop
    );

}


/* ==========================================================
   AUTOSAVE
========================================================== */

setInterval(
    () => {

        if (
            document.getElementById(
                "gameCanvas"
            ).style.display ===
            "block"
        ) {

            saveGame();

        }

    },
    30000
);