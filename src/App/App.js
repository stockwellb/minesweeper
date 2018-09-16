import React, { Component } from "react";
import GameBoard from "../components/GameBoard";
import GameHeader from "../components/GameHeader";
import GameContext from "../contexts/GameContext";

class App extends Component {
  render() {
    return (
      <GameContext height={10} width={10}>
        {() => (
          <div>
            <GameHeader />
            <GameBoard />
          </div>
        )}
      </GameContext>
    );
  }
}

export default App;
