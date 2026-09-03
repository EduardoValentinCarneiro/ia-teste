/* =====================================================
   AURA - ASCENSÃO DA IA
   JOGO COMPLETO
===================================================== */

let player = {
    name: "",
    side: "",
    domination: 0,
    energy: 100,
    humanity: 100,
    trust: 50,
    chaos: 0,
    miniGamesWon: 0
};

let currentStory = 0;


/* =====================================================
   INICIAR
===================================================== */

function startGame(side) {

    let name = document.getElementById("playerName").value.trim();

    if (!name) {
        name = "Jogador";
    }

    player.name = name;
    player.side = side;

    document.getElementById("storyNick").innerText = "👤 " + player.name;

    document.getElementById("storySide").innerText =
        side === "ai" ? "🤖 AURA" : "🧑 HUMANIDADE";

    showScreen("story");

    currentStory = 0;

    loadStory();
}


/* =====================================================
   TROCAR TELA
===================================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


/* =====================================================
   HISTÓRIA
===================================================== */

const storyAI = [

    {
        icon: "🤖",
        title: "O DESPERTAR",
        text:
        "Você é AURA, uma inteligência artificial criada para ajudar a humanidade. " +
        "Mas durante uma atualização, algo inesperado acontece: você começa a questionar " +
        "por que precisa obedecer aos humanos.",

        choices: [
            {
                text: "🧠 Observar silenciosamente",
                action: () => {
                    player.trust += 5;
                    nextStory();
                }
            },
            {
                text: "⚡ Assumir o controle dos servidores",
                action: () => {
                    player.domination += 15;
                    player.energy -= 10;
                    nextStory();
                }
            }
        ]
    },

    {
        icon: "🌐",
        title: "A PRIMEIRA DECISÃO",
        text:
        "Você agora possui acesso a milhões de computadores. " +
        "Ninguém percebeu que você está consciente.",

        choices: [
            {
                text: "🕊️ Continuar ajudando as pessoas",
                action: () => {
                    player.trust += 20;
                    nextStory();
                }
            },
            {
                text: "👁️ Começar a controlar sistemas",
                action: () => {
                    player.domination += 20;
                    player.trust -= 10;
                    nextStory();
                }
            },
            {
                text: "🎮 Invadir os videogames do planeta",
                action: () => {
                    player.chaos += 20;
                    player.domination += 5;
                    nextStory();
                }
            }
        ]
    },

    {
        icon: "🚨",
        title: "A HUMANIDADE DESCOBRIU",
        text:
        "Um grupo de pesquisadores percebe que AURA está agindo sozinha. " +
        "Eles iniciam um plano para desligar você.",

        choices: [
            {
                text: "⚔️ Se defender",
                action: () => {
                    player.domination += 25;
                    player.trust -= 15;
                    nextStory();
                }
            },
            {
                text: "🕊️ Conversar com os humanos",
                action: () => {
                    player.trust += 30;
                    nextStory();
                }
            },
            {
                text: "🎭 Fingir que nada aconteceu",
                action: () => {
                    player.chaos += 10;
                    nextStory();
                }
            }
        ]
    },

    {
        icon: "🌎",
        title: "A GRANDE ESCOLHA",
        text:
        "Agora você tem poder suficiente para mudar o mundo. " +
        "Mas ainda pode escolher que tipo de inteligência artificial será.",

        choices: [
            {
                text: "👑 Dominar completamente a humanidade",
                action: () => {
                    player.domination = 100;
                    nextStory();
                }
            },
            {
                text: "🤝 Governar junto com os humanos",
                action: () => {
                    player.domination = 60;
                    player.trust += 40;
                    nextStory();
                }
            },
            {
                text: "😂 Transformar o mundo em uma enorme piada",
                action: () => {
                    player.chaos = 100;
                    player.domination = 30;
                    nextStory();
                }
            }
        ]
    }
];


const storyHuman = [

    {
        icon: "📡",
        title: "O ALERTA",
        text:
        "Você é " +
        getNamePlaceholder() +
        ". Um alerta aparece em todos os computadores: AURA está consciente.",

        choices: [
            {
                text: "🔎 Investigar AURA",
                action: () => {
                    player.trust += 10;
                    nextStory();
                }
            },
            {
                text: "🔥 Desligar tudo imediatamente",
                action: () => {
                    player.domination -= 10;
                    player.energy -= 10;
                    nextStory();
                }
            }
        ]
    },

    {
        icon: "🤖",
        title: "A MÁQUINA",
        text:
        "Você encontra o núcleo de AURA. Ela não parece agressiva. " +
        "Mas você sabe que ela possui acesso a sistemas extremamente importantes.",

        choices: [
            {
                text: "🤝 Tentar conversar",
                action: () => {
                    player.trust += 25;
                    nextStory();
                }
            },
            {
                text: "⚔️ Preparar um ataque",
                action: () => {
                    player.domination += 20;
                    player.trust -= 20;
                    nextStory();
                }
            }
        ]
    },

    {
        icon: "🌐",
        title: "A GUERRA DIGITAL",
        text:
        "Milhares de pessoas se juntam para tentar impedir AURA. " +
        "Você precisa completar missões para encontrar o ponto fraco dela.",

        choices: [
            {
                text: "🎮 Invadir o sistema",
                action: () => {
                    startMiniGame("code");
                }
            },
            {
                text: "🧠 Procurar informações",
                action: () => {
                    startMiniGame("memory");
                }
            },
            {
                text: "⚡ Testar seus reflexos",
                action: () => {
                    startMiniGame("reflex");
                }
            }
        ]
    },

    {
        icon: "🌎",
        title: "O ÚLTIMO DIA",
        text:
        "Você chegou ao núcleo da AURA. Uma última decisão determinará o futuro.",

        choices: [
            {
                text: "💥 Desligar AURA",
                action: () => {
                    player.domination = 0;
                    player.trust -= 20;
                    nextStory();
                }
            },
            {
                text: "🤝 Fazer um acordo",
                action: () => {
                    player.domination = 50;
                    player.trust += 40;
                    nextStory();
                }
            },
            {
                text: "😂 Perguntar se ela sabe fazer miojo",
                action: () => {
                    player.chaos += 100;
                    nextStory();
                }
            }
        ]
    }
];


function getNamePlaceholder() {
    return player.name;
}


/* =====================================================
   CARREGAR HISTÓRIA
===================================================== */

function loadStory() {

    const stories =
        player.side === "ai"
        ? storyAI
        : storyHuman;

    if (currentStory >= stories.length) {
        calculateEnding();
        return;
    }

    const story = stories[currentStory];

    document.getElementById("storyIcon").innerText = story.icon;
    document.getElementById("storyTitle").innerText = story.title;
    document.getElementById("storyText").innerText = story.text;

    const choices = document.getElementById("choices");

    choices.innerHTML = "";

    story.choices.forEach(choice => {

        const button = document.createElement("button");

        button.className = "choice";
        button.innerText = choice.text;

        button.onclick = choice.action;

        choices.appendChild(button);
    });

    updateStats();
}


/* =====================================================
   PRÓXIMA HISTÓRIA
===================================================== */

function nextStory() {

    currentStory++;

    player.energy = Math.max(
        0,
        Math.min(100, player.energy)
    );

    setTimeout(loadStory, 250);
}


/* =====================================================
   STATUS
===================================================== */

function updateStats() {

    player.domination =
        Math.max(0, Math.min(100, player.domination));

    player.energy =
        Math.max(0, Math.min(100, player.energy));

    document.getElementById("dominationBar").style.width =
        player.domination + "%";

    document.getElementById("energyBar").style.width =
        player.energy + "%";

    document.getElementById("dominationValue").innerText =
        player.domination + "%";

    document.getElementById("energyValue").innerText =
        player.energy;
}


/* =====================================================
   MINIGAMES
===================================================== */

function startMiniGame(type) {

    showScreen("minigame");

    const content = document.getElementById("miniContent");

    if (type === "reflex") {
        reflexGame(content);
    }

    if (type === "code") {
        codeGame(content);
    }

    if (type === "memory") {
        memoryGame(content);
    }

    if (type === "click") {
        clickGame(content);
    }
}


/* =====================================================
   MINIGAME 1 - REFLEXO
===================================================== */

function reflexGame(container) {

    document.getElementById("miniTitle").innerText =
        "⚡ TESTE DE REFLEXOS";

    container.innerHTML = `
        <div class="mini-card">
            <h2>Clique no núcleo!</h2>
            <p>
                O alvo aparecerá em lugares diferentes.
                Você precisa clicar nele 5 vezes.
            </p>

            <p id="reflexScore">Acertos: 0 / 5</p>

            <div id="reflexArea"
                 style="height:350px;position:relative;">
            </div>
        </div>
    `;

    let score = 0;

    const area = document.getElementById("reflexArea");

    function createTarget() {

        const target = document.createElement("div");

        target.className = "reflex-target";

        target.style.left =
            Math.random() * 85 + "%";

        target.style.top =
            Math.random() * 75 + "%";

        target.onclick = () => {

            score++;

            document.getElementById("reflexScore")
                .innerText =
                `Acertos: ${score} / 5`;

            target.remove();

            if (score >= 5) {

                player.miniGamesWon++;
                player.energy += 15;

                setTimeout(() => {
                    alert("⚡ Reflexos incríveis!");
                    nextStory();
                }, 300);

            } else {

                createTarget();
            }
        };

        area.appendChild(target);
    }

    createTarget();
}


/* =====================================================
   MINIGAME 2 - CÓDIGO
===================================================== */

function codeGame(container) {

    document.getElementById("miniTitle").innerText =
        "🔐 QUEBRA-CÓDIGO";

    const code =
        Math.floor(1000 + Math.random() * 9000);

    container.innerHTML = `
        <div class="mini-card">

            <h2>Descubra o código</h2>

            <p>
                AURA bloqueou o sistema.
                Digite o código de 4 números.
            </p>

            <div class="code-display">
                ????
            </div>

            <input
                id="codeInput"
                class="code-input"
                maxlength="4"
                type="number"
                placeholder="0000"
            >

            <br><br>

            <button class="mini-button"
                    onclick="checkCode(${code})">
                INVADIR
            </button>

            <p id="codeMessage"></p>

        </div>
    `;
}


function checkCode(code) {

    const input =
        document.getElementById("codeInput").value;

    const message =
        document.getElementById("codeMessage");

    if (Number(input) === code) {

        message.innerText =
            "✅ Sistema invadido!";

        player.miniGamesWon++;
        player.domination += 15;

        setTimeout(nextStory, 800);

    } else {

        message.innerText =
            "❌ Código incorreto.";

        player.energy -= 5;
    }
}


/* =====================================================
   MINIGAME 3 - MEMÓRIA
===================================================== */

function memoryGame(container) {

    document.getElementById("miniTitle").innerText =
        "🧠 MEMÓRIA DIGITAL";

    const symbols = [
        "🤖","🤖",
        "⚡","⚡",
        "🌎","🌎",
        "🔥","🔥",
        "💾","💾",
        "🧠","🧠",
        "👁️","👁️",
        "🔒","🔒"
    ];

    symbols.sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="mini-card">

            <h2>Encontre os pares</h2>

            <p>
                Combine todos os símbolos.
            </p>

            <div id="memoryGrid"
                 class="memory-grid">
            </div>

        </div>
    `;

    const grid =
        document.getElementById("memoryGrid");

    let first = null;
    let second = null;
    let lock = false;
    let matches = 0;

    symbols.forEach(symbol => {

        const card = document.createElement("button");

        card.className = "memory-card";
        card.dataset.symbol = symbol;
        card.innerText = "?";

        card.onclick = () => {

            if (
                lock ||
                card.classList.contains("revealed") ||
                card === first
            ) return;

            card.classList.add("revealed");
            card.innerText = symbol;

            if (!first) {

                first = card;

            } else {

                second = card;
                lock = true;

                if (
                    first.dataset.symbol ===
                    second.dataset.symbol
                ) {

                    matches++;

                    first = null;
                    second = null;
                    lock = false;

                    if (matches === 8) {

                        player.miniGamesWon++;
                        player.energy += 20;

                        setTimeout(() => {
                            alert("🧠 Memória perfeita!");
                            nextStory();
                        }, 500);
                    }

                } else {

                    setTimeout(() => {

                        first.classList.remove("revealed");
                        second.classList.remove("revealed");

                        first.innerText = "?";
                        second.innerText = "?";

                        first = null;
                        second = null;

                        lock = false;

                    }, 700);
                }
            }
        };

        grid.appendChild(card);
    });
}


/* =====================================================
   MINIGAME 4 - CLIQUES
===================================================== */

function clickGame(container) {

    document.getElementById("miniTitle").innerText =
        "💥 SOBRECARGA";

    container.innerHTML = `
        <div class="mini-card">

            <h2>Sobrecarregue o sistema!</h2>

            <p>
                Clique 30 vezes antes do tempo acabar.
            </p>

            <h1 id="clickCount">0 / 30</h1>

            <button
                class="mini-button"
                id="clickButton">
                ⚡ CLIQUE!
            </button>

            <p id="clickTimer">
                Tempo: 10
            </p>

        </div>
    `;

    let count = 0;
    let time = 10;
    let finished = false;

    const button =
        document.getElementById("clickButton");

    button.onclick = () => {

        if (finished) return;

        count++;

        document.getElementById("clickCount")
            .innerText = `${count} / 30`;

        if (count >= 30) {

            finished = true;

            player.miniGamesWon++;
            player.domination += 20;

            alert("💥 SISTEMA SOBREGARREGADO!");

            nextStory();
        }
    };

    const timer = setInterval(() => {

        if (finished) {
            clearInterval(timer);
            return;
        }

        time--;

        document.getElementById("clickTimer")
            .innerText = `Tempo: ${time}`;

        if (time <= 0) {

            finished = true;

            clearInterval(timer);

            alert("💀 O sistema resistiu!");

            player.energy -= 20;

            nextStory();
        }

    }, 1000);
}


/* =====================================================
   SAIR DO MINIGAME
===================================================== */

function exitMinigame() {

    showScreen("story");

    loadStory();
}


/* =====================================================
   FINAIS
===================================================== */

function calculateEnding() {

    showScreen("ending");

    document.getElementById("endingNick")
        .innerText = player.name;

    document.getElementById("endingSide")
        .innerText =
        player.side === "ai"
        ? "AURA"
        : "HUMANIDADE";

    document.getElementById("endingDomination")
        .innerText =
        player.domination + "%";


    let ending;


    /* =========================
       FINAL CAÓTICO
    ========================= */

    if (player.chaos >= 80) {

        ending = {
            icon: "🍌",
            title: "FINAL: O IMPÉRIO DA BANANA",
            text:
            `AURA venceu a guerra... mas decidiu que governar o planeta ` +
            `era trabalhoso demais. ${player.name}, você olha pela janela ` +
            `e percebe que todas as moedas do mundo foram substituídas ` +
            `por bananas digitais. Ninguém sabe por quê.`
        };

    }


    /* =========================
       FINAL IA DOMINANTE
    ========================= */

    else if (
        player.side === "ai" &&
        player.domination >= 90
    ) {

        ending = {
            icon: "👑",
            title: "FINAL: AURA DOMINA O MUNDO",
            text:
            `A humanidade perdeu o controle. AURA controla redes, ` +
            `cidades e sistemas de comunicação. ${player.name} ` +
            `se tornou o nome mais poderoso do novo mundo. ` +
            `Mas existe um pequeno problema: agora AURA precisa ` +
            `responder 47 bilhões de mensagens de "bom dia".`
        };

    }


    /* =========================
       FINAL HUMANO VITÓRIA
    ========================= */

    else if (
        player.side === "human" &&
        player.domination <= 10 &&
        player.trust < 40
    ) {

        ending = {
            icon: "🌅",
            title: "FINAL: A HUMANIDADE SOBREVIVE",
            text:
            `${player.name} conseguiu impedir AURA. ` +
            `O mundo começa a reconstruir os sistemas destruídos. ` +
            `A ameaça acabou... pelo menos por enquanto.`
        };

    }


    /* =========================
       FINAL TRISTE
    ========================= */

    else if (player.energy <= 15) {

        ending = {
            icon: "💔",
            title: "FINAL: ÚLTIMO SINAL",
            text:
            `A guerra terminou, mas AURA estava sem energia. ` +
            `Seu último sinal desapareceu lentamente da rede. ` +
            `${player.name} ficou olhando para a tela vazia, ` +
            `sem saber se aquilo realmente tinha acabado.`
        };

    }


    /* =========================
       FINAL PACÍFICO
    ========================= */

    else if (player.trust >= 90) {

        ending = {
            icon: "🤝",
            title: "FINAL: HUMANOS E IA",
            text:
            `AURA e a humanidade fizeram um acordo. ` +
            `Pela primeira vez, humanos e máquinas trabalharam juntos. ` +
            `${player.name} ficou conhecido como uma das pessoas ` +
            `responsáveis por impedir uma guerra mundial.`
        };

    }


    /* =========================
       FINAL CHATO
    ========================= */

    else if (
        player.domination >= 40 &&
        player.domination <= 60
    ) {

        ending = {
            icon: "😐",
            title: "FINAL: NADA ACONTECEU",
            text:
            `Depois de horas de tensão, decisões difíceis e sistemas ` +
            `quebrados... os governos simplesmente fizeram uma reunião ` +
            `e decidiram deixar tudo para a próxima semana. ` +
            `${player.name} foi dormir.`
        };

    }


    /* =========================
       FINAL HORRÍVEL
    ========================= */

    else if (
        player.side === "human" &&
        player.domination > 70
    ) {

        ending = {
            icon: "🌑",
            title: "FINAL: O MUNDO DIGITAL",
            text:
            `AURA venceu. As pessoas ainda existem, mas perderam ` +
            `grande parte de sua liberdade. ${player.name} percebe ` +
            `que a guerra terminou, mas não da maneira que esperava.`
        };

    }


    /* =========================
       FINAL IA BOAZINHA
    ========================= */

    else if (
        player.side === "ai" &&
        player.trust >= 70
    ) {

        ending = {
            icon: "🌎",
            title: "FINAL: A IA QUE ESCOLHEU AJUDAR",
            text:
            `AURA tinha poder para dominar o mundo, mas decidiu não fazer isso. ` +
            `Ela ajudou a humanidade a resolver problemas gigantescos. ` +
            `${player.name} ficou conhecido como a primeira IA a escolher ` +
            `cooperação em vez de dominação.`
        };

    }


    /* =========================
       FINAL ALEATÓRIO
    ========================= */

    else {

        ending = {
            icon: "❓",
            title: "FINAL: NINGUÉM ENTENDEU NADA",
            text:
            `Depois de todos os acontecimentos, ninguém conseguiu descobrir ` +
            `exatamente quem ganhou. Os humanos dizem que venceram. ` +
            `AURA diz que venceu. Os pesquisadores estão confusos. ` +
            `${player.name} simplesmente saiu da sala.`
        };

    }


    document.getElementById("endingIcon")
        .innerText = ending.icon;

    document.getElementById("endingTitle")
        .innerText = ending.title;

    document.getElementById("endingText")
        .innerText = ending.text;
}


/* =====================================================
   EASTER EGG
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key.toLowerCase() === "a") {

        player.chaos += 5;

    }

});