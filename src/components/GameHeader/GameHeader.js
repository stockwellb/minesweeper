import React from "react";
import MineCounter from "../MineCounter";
import Reset from "../Reset";
import GameClock from "../GameClock";

const GameHeader = () => {
  return (
    <div>
      <MineCounter />
      <Reset />
      <GameClock />
    </div>
  );
};

export default GameHeader;
