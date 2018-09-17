import React from "react";
import styled from "styled-components";
import MineCounter from "../MineCounter";
import Reset from "../Reset";
import GameClock from "../GameClock";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GameHeader = ({ marked, onReset, time }) => {
  return (
    <StyledDiv>
      <MineCounter count={marked} />
      <Reset onReset={onReset} />
      <GameClock time={time} />
    </StyledDiv>
  );
};

export default GameHeader;
