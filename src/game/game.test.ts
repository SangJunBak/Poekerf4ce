import { generateShuffledCards } from "./start";
import { start } from "./index";
import { dispatch } from "../store";
import { playerFactory } from "./player";

describe("game", () => {
  it("should start correctly", () => {
    dispatch(start([playerFactory(), playerFactory()]));
  });
});

describe("helpers", () => {
  it("should generate a list of cards", () => {
    const cards = generateShuffledCards();
    expect(cards).toHaveLength(52);
  });
});
