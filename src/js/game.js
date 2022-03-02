const FRONT = "frente-carta";
const BACK = "atras-carta";

let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: (id) => {
        let card = cards.filter(card => card.id == id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!game.firstCard) {
            game.firstCard = card;
            card.flipped = true;
            return true;
        } else {
            game.secondCard = card;
            card.flipped = true;
            game.lockMode = true;
            return true;
        }

    },

    checkGame: () => {
        if (game.firstCard != null && game.secondCard != null && game.firstCard.icon == game.secondCard.icon) {
            return game.firstCard.icon == game.secondCard.icon
        }
    },

    checkEndGame: () => {
        return cards.filter(card => !card.flipped).length == 0;
    },

    restartGame: () => {
        location.reload();
    },

    clearCards: () => {
        game.firstCard = null;
        game.secondCard = null;
        game.lockMode = false;
    },

}

let champs = [
    "Ekko",
    "Elise",
    "Jinx",
    "Kayn",
    "Kindred",
    "Nasus",
    "Rhaast",
    "Viego",
    "Warwick",
    "Zed"
] // todos campeões que vão estar nas cartas

let cards = [];

const createCardsPair = (champs) => { // criar 2 cartas do mesmo campeão mas com ids diferentes
    return [{
        id: createId(champs),
        icon: `../icons/${champs}Square.png`,
        flipped: false,
    }, {
        id: createId(champs),
        icon: `../icons/${champs}Square.png`,
        flipped: false,
    }]
}

const createId = (champs) => {

    return champs + parseInt(Math.random() * 1000); // retorna um id aleatorio entre 0 e 999

}

const createCards = (champs) => {

    champs.forEach(champ => {
        cards.push(createCardsPair(champ)); // para cada campeão, cria um par e popula o array com o objeto dos 2
    });

    return cards.flatMap(card => card); // retorna o array desmembrando a "dupla" de cartas por causa da função flatMap
}

const embaralharCartas = (cards) => {
    let cartaAtual = cards.length;
    let aleatorio = 0;

    while (cartaAtual !== 0) {
        aleatorio = Math.floor(Math.random() * cartaAtual);
        cartaAtual--;

        [cards[aleatorio], cards[cartaAtual]] = [cards[cartaAtual], cards[aleatorio]]; // enquanto tiver passando pelas cartas, inverte o valor da primeira com a última até chegar a 0
        // as cartas serão aleatórias graças a variavel aleatorio que criar um valor entre 0 e 19 para que a carta invertida pela última seja sempre aleatória
    }
}

const iniciarJogo = () => {
    cards = createCards(champs);
    embaralharCartas(cards);
    renderizarCartas(cards)
}

const flipCard = (element) => {
    if (game.setCard(element.id)) {

        element.classList.add("flip");

        if (game.checkGame.bind(game)()) {
            game.clearCards();
            let acertou = document.getElementById("acertou");
            acertou.style.display = "flex";

            setTimeout(() => {
                acertou.style.display = "none"
            }, 1000)
            // fazer função que aparece se foi par ou não
            if (game.checkEndGame()) {
                let endLayout = document.getElementById("endGame");
                endLayout.style.display = "flex";

            }
        } else {
            if (game.secondCard) {
                let errou = document.getElementById("errou");
                errou.style.display = "flex";

                setTimeout(() => {
                    let firstCard = document.getElementById(game.firstCard.id);
                    let secondCard = document.getElementById(game.secondCard.id);

                    game.firstCard.flipped = false;
                    game.secondCard.flipped = false;

                    firstCard.classList.remove("flip");
                    secondCard.classList.remove("flip");



                    errou.style.display = "none"
                    game.clearCards();
                }, 700)
            };
        }

    }
}

let btnRestart = document.getElementById("btnRestart");

btnRestart.addEventListener("click", () => {
    game.restartGame();
})

let btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", () => {
    iniciarJogo();

    let startDiv = document.getElementById("start");
    startDiv.style.display = "none";
})



