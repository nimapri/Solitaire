const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

class Game {
    constructor() {
        this.deck = shuffleDeck(createDeck());
        this.tableau = Array.from({ length: 7 }, () => []);
        this.foundation = [[], [], [], []];
        this.stock = [];

        console.log(this.deck);
    }
}



function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(new Card(suit, rank));
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

let deck = shuffleDeck(createDeck());

function dealCards(deck) {
    const tableau = Array.from({ length: 7 }, () => []);
    const foundation = [[], [], [], []];
    let stock = [];

    // Deal to tableau
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            tableau[j].push(deck.pop());
        }
    }

    // Remaining cards go to stock
    stock = deck;

    return { tableau, foundation, stock };
}

let { tableau, foundation, stock } = dealCards(deck);

function createCardElement(card, fromColumnIndex) {
    const cardElement = $('<div>').addClass('card');
    cardElement.addClass(card.suit === 'hearts' || card.suit === 'diamonds' ? 'red' : 'black');
    cardElement.text(`${card.rank} ${getSuitSymbol(card.suit)}`);
    cardElement.attr('draggable', true);
    cardElement.data('fromColumn', fromColumnIndex);
    cardElement.on('dragstart', onDragStart);
    return cardElement;
}

function getSuitSymbol(suit) {
    switch (suit) {
        case 'hearts':
            return '♥';
        case 'diamonds':
            return '♦';
        case 'clubs':
            return '♣';
        case 'spades':
            return '♠';
    }
}

function onDragStart(event) {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.innerText);
    event.originalEvent.dataTransfer.setData('fromColumn', event.target.dataset.fromColumn);
    event.target.style.opacity = 0.5;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    const cardData = event.originalEvent.dataTransfer.getData('text/plain');
    const fromColumnIndex = event.originalEvent.dataTransfer.getData('fromColumn');
    const toColumnElement = $(event.target).closest('.column');
    const toColumnIndex = Array.from(toColumnElement.parent().children()).indexOf(toColumnElement);

    // Remove card from the original tableau column
    const cardToMove = tableau[fromColumnIndex].pop();

    // Add card to the new tableau column
    tableau[toColumnIndex].push(cardToMove);

    // Update the UI
    const cardElement = createCardElement(parseCard(cardData), toColumnIndex);
    toColumnElement.append(cardElement);
    event.target.style.opacity = 1;

    onCardMove();
}

function parseCard(cardString) {
    const [rank, suitSymbol] = cardString.split(' ');
    const suit = suitSymbolToName(suitSymbol);
    return { rank, suit };
}

function suitSymbolToName(symbol) {
    switch (symbol) {
        case '♥':
            return 'hearts';
        case '♦':
            return 'diamonds';
        case '♣':
            return 'clubs';
        case '♠':
            return 'spades';
    }
}

function checkWinCondition(foundation) {
    return foundation.every(pile => pile.length === 13);
}

function onCardMove() {
    if (checkWinCondition(foundation)) {
        alert('You win!');
    }
}

// Set up the initial tableau display
const tableauColumns = $('.tableau .column');
tableau.forEach((column, index) => {
    column.forEach(card => {
        const cardElement = createCardElement(card, index);
        tableauColumns.eq(index).append(cardElement);
    });
});

// Set up drop zones
$('.column, .foundation-slot').on('dragover', onDragOver);
$('.column, .foundation-slot').on('drop', onDrop);
