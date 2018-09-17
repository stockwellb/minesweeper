import React from "react";
import MineCounter from "../MineCounter";
import Reset from "../Reset";
import GameClock from "../GameClock";

const GameHeader = ({ marked, onReset, time }) => {
  return (
    <div>
      <MineCounter count={marked} />
      <Reset onReset={onReset} />
      <GameClock time={time} />
    </div>
  );
};

export default GameHeader;
