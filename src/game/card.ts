export enum Suit {
  CLUBS = "Clubs",
  HEARTS = "Hearts",
  SPADES = "Spades",
  DIAMONDS = "Diamonds",
}

export const SuitList = Object.values(Suit);

export enum Rank {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,
}

export const RankList = Object.values(Rank).filter(
  (val) => !isNaN(Number(val))
);

export type Card = {
  suit: Suit;
  rank: Rank;
};

export default Card;
