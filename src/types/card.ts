export enum Suit {
  CLUBS,
  HEARTS,
  SPADES,
  DIAMONDS,
}

export enum Rank {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}

export type Card = {
  suit: Suit;
  rank: Rank;
};

export default Card;
