import React from "react";
import MineCounter from "../MineCounter";
import Reset from "../Reset";
import GameClock from "../GameClock";

const GameHeader = ({ marked }) => {
  return (
    <div>
      <MineCounter count={marked} />
      <Reset />
      <GameClock />
    </div>
  );
};

export default GameHeader;
