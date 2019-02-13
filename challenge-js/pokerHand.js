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

  getRank() {
    // 1. Initiate the deck.
    this.initDeck();
    // 2. Create an array of objects which is the hand.
    this.initHand(this.cards);
    return 'Royal Flush';
  }
}

module.exports = PokerHand;
