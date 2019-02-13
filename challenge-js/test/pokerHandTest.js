var assert = require('assert');
var PokerHand = require('../pokerHand.js');

describe('Initiates a deck of cards', function() {
  const hand = new PokerHand('As Ks Qs Js 10s');

  it('Return 52 cards', function() {
    assert.equal(hand.initDeck().length, 52);
  });
});

describe('Checks if hand dealt is 5 cards', function() {
  const hand = new PokerHand('As Ks Qs Js 10s');

  it('Returns a hand with the length of 5', function() {
    assert.equal(hand.handleValidity('As Ks Qs Js 10s').length, 5);
  });
});

describe('Checks if the hand has duplicate cards', function() {
  const hand = new PokerHand('As 4s Qs Js 10s');

  it('Doesn\'t return an error when the hand is dealt.', function() {
    assert.equal(hand.handleDuplicates('As 4s Qs Js 10s'), 'As 4s Qs Js 10s');
  });
});

describe('Rank a Royal Flush', function() {
  const hand = new PokerHand('As Ks Qs Js 10s');

  it('Return royal flush when hand given', function() {
    assert.equal(hand.getRank(), 'Royal Flush');
  });
});

describe('Rank A Straight', function() {
  const hand = new PokerHand('9c 8d 7s 6d 5h');

  it('Return straight when hand given', function() {
    assert.equal(hand.getRank(), 'Straight');
  });
});

describe('Rank A Straight Flush', function() {
  const hand = new PokerHand('8c 7c 6c 5c 4c');

  it('Return straight flush when hand given', function() {
    assert.equal(hand.getRank(), 'Straight Flush');
  });
});

describe('Rank A Flush', function() {
  const hand = new PokerHand('4s Js 8s 2s 9s');

  it('Return flush when hand given', function() {
    assert.equal(hand.getRank(), 'Flush');
  });
});

describe('Rank A Flush', function() {
  const hand = new PokerHand('4s Js 8s 2s 9s');

  it('Return flush when hand given', function() {
    assert.equal(hand.getRank(), 'Flush');
  });
});

describe('Rank A Four of a Kind', function() {
  const hand = new PokerHand('5h 5d 5s 5c 2d');

  it('Return Four of a Kind when hand given', function() {
    assert.equal(hand.getRank(), 'Four of a Kind');
  });
});

describe('Rank A Three of a Kind', function() {
  const hand = new PokerHand('3c 3d 3s Jh Qs');

  it('Returns Three of a Kind when hand given', function() {
    assert.equal(hand.getRank(), 'Three of a Kind');
  });
});

describe('Rank a Pair', function() {
  const hand = new PokerHand('Ah As 10c 7d 6s');

  it('Return one pair when hand given', function() {
    assert.equal(hand.getRank(), 'One Pair');
  });
});

describe('Rank Two Pair', function() {
  const hand = new PokerHand('Kh Kc 3s 3h 2d');

  it('Return two pair when hand given', function() {
    assert.equal(hand.getRank(), 'Two Pair');
  });
});
