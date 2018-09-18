import React, { Component } from "react";
import styled from "styled-components";
import GameBoard from "../components/GameBoard";
import GameHeader from "../components/GameHeader";
import Game from "../components/Game";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <Game x={10} y={10} bombs={10}>
        {({
          time,
          marked,
          rows,
          handleFlagged,
          handleSelected,
          handleReset
        }) => (
          <StyledDiv>
            <GameHeader time={time} marked={marked} onReset={handleReset} />
            <GameBoard
              rows={rows}
              onFlagged={handleFlagged}
              onSelected={handleSelected}
            />
          </StyledDiv>
        )}
      </Game>
    );
  }
}

export default App;
