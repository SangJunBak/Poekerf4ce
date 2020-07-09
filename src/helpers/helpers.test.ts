import { generateShuffledCards } from ".";

describe("helpers", () => {
  it("should generate a list of cards", () => {
    const cards = generateShuffledCards();
    expect(cards).toHaveLength(52);
  });
});
