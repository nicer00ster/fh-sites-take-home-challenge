class PokerHand {
  constructor(cards) {
    this.cards = cards;
    this.deck = [];
    this.hand = [];
    this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['c', 'd', 'h', 's'];
    this.handRank = [
      'Royal Flush',
      'Straight Flush',
      'Four of a Kind',
      'Full House',
      'Flush',
      'Straight',
      'Three of a Kind',
      'Two Pair',
      'One Pair',
      'High Card',
    ];
  }

  initDeck() {
    let id = 0;
    for(let s = 0; s < this.suits.length; s++) {
      for(let r = 0; r < this.ranks.length; r++) {
        let card = {
          id: id,
          rank: this.ranks[r],
          suit: this.suits[s],
        };
        this.deck.push(card);
        id++;
      }
    }
    return this.deck;
  }

  initHand(cards) {
    // Turn hand into readable object.
    return this.deck.map(card => {
      if(cards.includes(card.rank + card.suit)) {
        this.hand.push(card);
      };
    });
  }

  handleValidity(hand) {
    // 1. Turn hand into an array.
    const newHand = hand.split(' ');
    // 2. Check if the hand has a length of 5.
    if(newHand.length !== 5) {
      throw new Error('Hand being dealt must be 5 cards!');
    }
    // 3. Make sure its data type is a string.
    if(typeof hand !== 'string') {
      throw new Error('The hand dealt must be a string!');
    }
    // 4. Return the new hand.
    return newHand;
  }

  handleDuplicates(cards) {
    const cardIds = [];
    const newCards = [];
    // 1. Clone the deck with correct displaying of the input value. i.e; Kh 3c 6d 10c Qd
    const newDeck = this.deck.map(card => {
      return card['rank'] + card['suit'];
    });
    newCards.push(...cards.split(' '));
    // 2. Push card IDs into an empty array.
    newCards.map(card => {
      cardIds.push(newDeck.indexOf(card));
    });
    // 3. Filter through the cards that are dealt and find if there are duplicate IDs.
    cardIds.filter((card, index) => {
      if(cardIds.indexOf(card) != index & card > -1) {
        // Throw error if duplicates.
        throw new Error(`Found duplicate of card ID: ${card}. Make sure each card dealt is unique.`);
      }
    });
    // 4. If everything checks out, return the cards.
    console.log(cards);
    return cards;
  }


  getRank() {
    // 1. Initiate the deck.
    this.initDeck();
    // 2. Create an array of objects which is the hand.
    this.initHand(this.cards);
    // 3. Make sure the hand is 5 cards and its data type is a string.
    this.handleValidity(this.cards);
    // 4. Check if the hand has duplicate cards in the deck.
    this.handleDuplicates(this.cards);
    return 'Royal Flush';
  }
}

module.exports = PokerHand;
