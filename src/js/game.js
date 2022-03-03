let btnRestart = document.querySelectorAll(".btn-restart");
btnRestart.forEach(element => {
    element.addEventListener("click", () => {
        game.restartGame();
    })
})

const btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", () => {
    iniciarJogo();

    let startDiv = document.getElementById("start");
    startDiv.style.display = "none";
});

let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
    tentativas: 20,

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
        } else if (game.tentativas == 0) {
        }
    },

    checkChances: () => {
        if (game.tentativas == 0) {
            document.getElementById("gameOver").style.display = "flex";
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

let cards = [], champs = ["Ekko", "Elise", "Jinx", "Kayn", "Kindred", "Nasus", "Rhaast", "Viego", "Warwick", "Zed"] // todos campeões que vão estar nas cartas


const iniciarJogo = () => {

    let tentativas = document.getElementById("tentativa");
    tentativas.innerHTML = game.tentativas;
    cards = createCards(champs);
    embaralharCartas(cards);
    renderizarCartas(cards);

}

const createCards = (champs) => {

    champs.forEach(champ => {
        cards.push(createCardsPair(champ)); // para cada campeão, cria um par e popula o array com o objeto dos 2
    });

    return cards.flatMap(card => card); // retorna o array desmembrando a "dupla" de cartas por causa da função flatMap

}

const createId = (champ) => {

    return champ + parseInt(Math.random() * 1000); // retorna um id aleatorio entre 0 e 999

}

const createCardsPair = (champs) => { // criar 2 cartas do mesmo campeão mas com ids diferentes

    return [{
        id: createId(champs),
        icon: `../icons/${champs}Square.png`,
        flipped: false,
    }, {
        id: createId(champs),
        icon: `../icons/${champs}Square.png`,
        flipped: false,
    }];

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


const flipCard = (element) => {

    if (game.setCard(element.id)) {

        element.classList.add("flip");

        if (game.checkGame.bind(game)()) { // se tem as duas cartas viradas checa o jogo

            game.clearCards();

            let acertou = document.getElementById("acertou");
            acertou.style.display = "flex";

            setTimeout(() => {
                acertou.style.display = "none"
            }, 1000);

            if (game.checkEndGame()) { // se retornar true pro fim de jogo

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

                    game.tentativas -= 1;
                    let tentativas = document.getElementById("tentativa");
                    tentativas.innerHTML = game.tentativas;

                    game.checkChances();

                }, 700) // espera 0.7 segundos para desvirar as cartas

            };
        }
    }
}




