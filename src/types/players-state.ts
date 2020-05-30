import { Player } from "./player";

export type PlayersState = {
  playersById: {
    [id: string]: Player;
  };
};

export default PlayersState;
