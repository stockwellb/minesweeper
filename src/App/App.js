import React, { Component } from "react";
import GameBoard from "../components/GameBoard";
import GameHeader from "../components/GameHeader";
import Game from "../components/Game";

class App extends Component {
  render() {
    return (
      <Game x={10} y={15} bombs={10}>
        {({
          time,
          marked,
          rows,
          handleFlagged,
          handleSelected,
          handleReset
        }) => (
          <div>
            <GameHeader time={time} marked={marked} onReset={handleReset} />
            <GameBoard
              rows={rows}
              onFlagged={handleFlagged}
              onSelected={handleSelected}
            />
          </div>
        )}
      </Game>
    );
  }
}

export default App;
