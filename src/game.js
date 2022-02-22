const FRONT = "frente-carta";
const BACK = "atras-carta";


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
]

let cards = [];

const mostrarCartas = () => {
    let cards = document.querySelectorAll(".card");
    console.log(cards);

    cards.forEach(card => {
        card.classList.add("flip");
    });

    const desvirarCartas = () => {
        cards.forEach(card => {
            card.classList.remove("flip");
        });
    }
    
    setTimeout(desvirarCartas, 5000);
}

window.onload = () => {
    mostrarCartas();
}

const createCardsPair = (champs) => {
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

    return champs + parseInt(Math.random() * 1000);

}

const createCards = (champs) => {

    champs.forEach(champ => {
        cards.push(createCardsPair(champ));
    });

    return cards.flatMap(card => card);
}

const embaralharCartas = (cards) => {
    let cartaAtual = cards.length;
    let aleatorio = 0;

    while (cartaAtual !== 0) {
        aleatorio = Math.floor(Math.random() * cartaAtual);
        cartaAtual--;

        [cards[aleatorio], cards[cartaAtual]] = [cards[cartaAtual], cards[aleatorio]];

    }
}

const flipCard = (element) => {
    element.classList.add("flip");
}

const renderizarCartas = (cards) => {
    let tabuleiro = document.getElementById("tabuleiro");

    cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add("card");

        tabuleiro.appendChild(cardElement);

        let frontCardElement = document.createElement("div");
        frontCardElement.classList.add("frente-carta");

        cardElement.addEventListener("click", () => {
            flipCard(cardElement);
        });

        cardElement.appendChild(frontCardElement);

        let icon = document.createElement("img");
        icon.src = card.icon;

        frontCardElement.appendChild(icon);

        let backCardElement = document.createElement("div");
        backCardElement.classList.add("atras-carta");

        cardElement.appendChild(backCardElement);

        let iconBack = document.createElement("img");
        iconBack.src = "../icons/league-of-legends-icon-transparent-27.jpg";
        iconBack.width = "120";
        iconBack.height = "120";

        backCardElement.appendChild(iconBack);
    });
}

const iniciarJogo = () => {
    cards = createCards(champs);
    embaralharCartas(cards);

    renderizarCartas(cards);
}

iniciarJogo();



