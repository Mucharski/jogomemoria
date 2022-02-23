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
    renderizarCartas(cards);
}

iniciarJogo();



