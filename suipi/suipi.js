cards = [];
ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
suits = ["Diamonds", "Hearts", "Spades", "Clubs"]
function createCards() {
  for (var i = 0; i < 52; i++) {
    cards.push({
      value: i % 13 + 1,
      rank: ranks[i % 13],
      suit: suits[Math.floor(i / 13)]
    })
    console.log(cards[i].value, cards[i].rank, cards[i].suit)
  }
}
createCards();
