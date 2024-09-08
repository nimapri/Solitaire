class Solitaire {
    constructor() {
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        this.deck = this.shuffleDeck(this.createDeck());
        this.tableau = Array.from({ length: 7 }, () => []);
        this.foundation = [[], [], [], []];
        this.stock = [];
        this.waste = [];

        this.setupGame();
    }

    createDeck() {
        let deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                deck.push(new Card(suit, rank));
            }
        }
        return deck;
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    dealCards() {
        // Deal to tableau
        for (let i = 0; i < 7; i++) {
            for (let j = i; j < 7; j++) {
            const card = this.deck.pop();
            if (j === i) {
                card.flipped = true;
            }
            this.tableau[j].push(card);
            }
        }

        // Remaining cards go to stock
        this.stock = this.deck;
    }

    createCardElement(card, fromColumnIndex) {
        // Create card element
    }

    getSuitSymbol(suit) {
        // Get suit symbol
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

    onDragStart(event) {
        // Handle drag start event
    }

    onDragOver(event) {
        // Handle drag over event
    }

    onDrop(event) {
        // Handle drop event
    }

    parseCard(cardString) {
        // Parse card string
    }

    suitSymbolToName(symbol) {
        // Convert suit symbol to name
    }

    checkWinCondition() {
        // Check win condition
    }

    onCardMove() {
        // Handle card move event
    }

 

    setupGame() {
        // Set up the initial tableau display
        // const tableauColumns = $('.tableau .column');
        // this.tableau.forEach((column, index) => {
        //     column.forEach(card => {
        //         const cardElement = this.createCardElement(card, index);
        //         tableauColumns.eq(index).append(cardElement);
        //     });
        // });

        // // Set up drop zones
        // $('.column, .foundation-slot').on('dragover', this.onDragOver);
        // $('.column, .foundation-slot').on('drop', this.onDrop);
    
        
    }

    render() {
        // Render the game
        this.renderStock();
        this.renderTableau();
        this.renderWaste();
    }

    renderStock() {
        // Render the stock
        const stockDiv = document.getElementById('stock');
        if (this.stock.length > 0) {
            stockDiv.innerHTML = `<div class="card"></div>`;
        }
    }
    renderTableau() {
        // Render the tableau
        for (let i = 0; i < this.tableau.length; i++) {
            const column = this.tableau[i];
            const columnDiv = document.getElementById(`column-${i+1}`);
            columnDiv.innerHTML = '';
            column.forEach((card, index) => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                if (index > 0) {
                    cardDiv.classList.add('stacked-cards');
                }

                if (card.flipped) {
                    cardDiv.classList.add('flipped');
                    cardDiv.innerHTML = `
                        <img src="img/cards/${card.rank}_of_${card.suit}.png" alt="${card.suit} ${card.rank}" style="width: 100%; height: 100%;">
                    `;
                }
               
                cardDiv.style.top = `${index * 1}px`;
                columnDiv.appendChild(cardDiv);
            });
        }
    }
    addWaste(wasteDiv,id,j){ 
        var c = j * 20;
        console.log("wasteDiv-c",this.waste.length, id,c);
        const card = this.waste[id];
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if(j!==0){
            cardDiv.classList.add('waste-card');
            cardDiv.style.left = `${c}px`;
        }{
            cardDiv.style.top = '20px';
        }
        cardDiv.innerHTML = `
            <img src="img/cards/${card.rank}_of_${card.suit}.png" alt="${card.suit} ${card.rank}" style="width: 100%; height: 100%;">
        `;
        wasteDiv.appendChild(cardDiv);
    }
    
    renderWaste() {
        // Render the waste
        const wasteDiv = document.getElementById('waste');
        wasteDiv.innerHTML = '';
        var j = 0;
        for (let i = Math.max(0, this.waste.length - 3); i < this.waste.length; i++) {
            this.addWaste(wasteDiv, i, j);
            j++;
        }


        // for(let i = 0; i < this.waste.length ; i++){
        //     if(this.waste.length > 3){
        //     this.addWaste(wasteDiv,i,true);
        //     }
        // }


        // if (this.waste.length >= 3) {
        //   this.addWaste(wasteDiv,3);
        // }
        // if (this.waste.length >= 2) {
        //     this.addWaste(wasteDiv,2);
        //   }
        //   if (this.waste.length >= 1) {
        //     this.addWaste(wasteDiv,1);
        //   }
    }
}

class Card {
    flipped = false;
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

const solitaire = new Solitaire();

function onStockClick() {
    console.log("pp",solitaire);
    // Handle card flip event
    solitaire.waste.push(solitaire.stock.pop());
    solitaire.render();

}

document.addEventListener('DOMContentLoaded', () => {
 
    solitaire.dealCards();
    solitaire.render();
    solitaire.setupGame();
    $('#stock').on('mouseup', onStockClick);
    $('#menu').on('click', () => {
        $('.menu-panel').toggle();
    });
    console.log(solitaire);
});