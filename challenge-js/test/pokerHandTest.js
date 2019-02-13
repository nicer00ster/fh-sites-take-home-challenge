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

/**
 * test
 */
describe('Rank a Royal Flush', function() {
  it('Return royal flush when hand given', function() {
    var hand = new PokerHand('As Ks Qs Js 10s');
    assert.equal(hand.getRank(), 'Royal Flush');
  });
});

/**
 * test
 */
describe('Rank a Pair', function() {
  it('Return one pair when hand given', function() {
    var hand = new PokerHand('Ah As 10c 7d 6s');

    assert.equal(hand.getRank(), 'One Pair');
  });
});

/**
 * test
 */
describe('Rank Two Pair', function() {
  it('Return two pair when hand given', function() {
    var hand = new PokerHand('Kh Kc 3s 3h 2d');

    assert.equal(hand.getRank(), 'Two Pair');
  });
});

/**
 * test
 */
describe('Rank A Flush', function() {
  var hand = new PokerHand('Kh Qh 6h 2h 9h');

  it('Return flush when hand given', function() {
    assert.equal(hand.getRank(), 'Flush');
  });
});

// More tests go here
