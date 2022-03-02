const mostrarCartas = () => {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.classList.add("flip");
    });

    const desvirarCartas = () => {
        cards.forEach(card => {
            card.classList.remove("flip");
        });
    }

    setTimeout(desvirarCartas, 5000); // inicia o jogo mostrando todas cartas por 5 segundos
}

const renderizarCartas = (cards) => {
    let tabuleiro = document.getElementById("tabuleiro");

    cards.forEach((card, i) => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add("card", "faded");

        cardElement.addEventListener("click", () => {
            flipCard(cardElement);
        });

        tabuleiro.appendChild(cardElement);

        renderizarFrente(card.icon, cardElement)

        renderizarBack(cardElement);

        setTimeout(() => {
            cardElement.classList.remove("faded");
        }, i * 100);

    });

    setTimeout(() => {
        mostrarCartas();
    }, cards.length * 100 + 2000);

}

const renderizarFrente = (icon, element) => {
    let frontCardElement = document.createElement("div");
    frontCardElement.classList.add("frente-carta");

    element.appendChild(frontCardElement);

    let icone = document.createElement("img");
    icone.src = icon;

    frontCardElement.appendChild(icone);
}

const renderizarBack = (element) => {
    let backCardElement = document.createElement("div");
    backCardElement.classList.add("atras-carta");

    element.appendChild(backCardElement);

    let iconBack = document.createElement("img");
    iconBack.src = "../icons/league-of-legends-icon-transparent-27.jpg";
    iconBack.width = "120";
    iconBack.height = "120";

    backCardElement.appendChild(iconBack);
}