import gameReducer, { initialState, start } from "./index";

describe("game", () => {
  test("should start correctly", () => {
    const payload = {
      cards: [],
      players: [],
    };
    console.log(gameReducer(initialState, { payload, type: start.type }));
  });
});
