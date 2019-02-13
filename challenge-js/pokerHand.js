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

  handleSuits() {
    return this.hand.map(card => card.suit);
  }

  handleRank() {
    return this.hand.map(card => card.rank);
  }

  rateRanks(ranks) {
    return ranks.map(rank => this.ranks.indexOf(rank));
  }

  sortRanks(ranks) {
    return ranks.sort((a, b) => b - a);
  }

  handlePairs(ranks) {
    // 1. Create an empty array where our pairs will go.
    const pairs = [];
    // 2. Use the .some method to see if our rank array has any pairs.
    ranks.some((rank, i) => {
      if(ranks.indexOf(rank) != i) {
        // 3. Push them into our empty array if it does.
        pairs.push(rank);
      }
    });
    // 4. Return the number of pairs we have in our array.
    return pairs.length;
  }

  handleKinds(ranks) {
    // 1. Create an object to store the counts of each rank.
    const counts = {};
    let result;
    // 2. Loop over the ranks and insert them into our counts object.
    ranks.map(rank => {
      counts[rank] = (
        counts[rank] || 0
      ) + 1;
    });
    // 3. Loop over our object and get the total number of recurring ranks
    // and flip our result variable to our value;
    Object.values(counts).map(count => {
      if(count === 4) {
        result = 'Four of a Kind';
      } else if(count === 3) {
        result = 'Three of a Kind';
      } else {
        return false;
      }
    });
    // 4. Return the result to the user.
    return result;
  }

  handleFlush(suits) {
    let suit = suits[0];

    for (let card of this.hand) {
      if (card.suit != suit)
        return false;
    }
    return true;
  }

  handleRoyalFlush() {
    let result = [];
    const handSuits = this.handleSuits();
    this.hand.map(card => {
      result.push(card.rank);
    });
    if(result.sort().join('') === "10AJKQ" && this.handleFlush(handSuits)) {
      return true;
    } else return false;
  }

  handleStraight(ranks) {
    return ranks[0] - ranks[4] === 4 || ranks[0] - ranks[4] === 12;
  }

  getRank() {
    // 1. Initiate the deck.
    this.initDeck();
    // 2. Create an array of objects which is the hand.
    this.initHand(this.cards);
    const handRanks = this.handleRank();
    const handSuits = this.handleSuits();
    const ratedRanks = this.rateRanks(handRanks);
    const sortedRanks = this.sortRanks(ratedRanks);
    // console.log('handsuits', handSuits);
    // console.log('handranks', handRanks);
    // console.log('sorted&rated', sortedRanks);

    // 3. Make sure the hand is 5 cards and its data type is a string.
    this.handleValidity(this.cards);
    // 4. Check if the hand has duplicate cards in the deck.
    this.handleDuplicates(this.cards);
    // 5. Evaluate the given hand from highest value hand to lowest.
    if(this.handleStraight(sortedRanks) & this.handleFlush(handSuits) & this.handleRoyalFlush()) {
      return 'Royal Flush';
    } else if(this.handleStraight(sortedRanks) & this.handleFlush(handSuits)) {
      return 'Straight Flush';
    } else if(this.handleFlush(handSuits) & !this.handleStraight(sortedRanks)) {
      return 'Flush';
    } else if(this.handleStraight(sortedRanks)) {
      return 'Straight';
    } else if(this.handleKinds(ratedRanks) === 'Four of a Kind') {
      return 'Four of a Kind';
    } else if(this.handleKinds(ratedRanks) === 'Three of a Kind' & this.handlePairs(ratedRanks) === 1) {
      return 'Full House';
    } else if(this.handleKinds(ratedRanks) === 'Three of a Kind') {
      return 'Three of a Kind';
    } else if(this.handlePairs(ratedRanks) === 2) {
      return 'Two Pair';
    } else if(this.handlePairs(ratedRanks) === 1) {
      return 'One Pair';
    } else {
      return 'High Card';
    }
  }
}

module.exports = PokerHand;
