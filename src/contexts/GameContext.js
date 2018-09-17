import React, { Component } from "react";
import { createBoard, revealCell, revealAllCells } from "../utils";

class GameContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      marked: props.bombs,
      rows: []
    };
    this.handleFlagged = this.handleFlagged.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.setState({
      rows: createBoard(this.props.x, this.props.y, this.props.bombs)
    });
  }

  handleFlagged(x, y) {
    return e => {
      e.preventDefault();
      this.setState(prevState => {
        const marked = prevState.rows[x][y].mode === 1;
        if (marked) {
          prevState.rows[x][y].mode = 0;
        } else {
          prevState.rows[x][y].mode = 1;
        }
        return {
          rows: [...prevState.rows],
          marked: prevState.marked + (marked ? 1 : -1)
        };
      });
    };
  }

  handleSelected(x, y) {
    return e => {
      const cell = this.state.rows[x][y];
      if (cell.isBomb) {
        this.setState(prevState => {
          const rows = revealAllCells(prevState.rows);
          return { rows: rows };
        });
      } else {
        this.setState(prevState => {
          const rows = revealCell(prevState.rows, x, y);
          return { rows: rows };
        });
      }
    };
  }

  handleReset() {}

  render() {
    return this.props.children({
      time: this.state.time,
      marked: this.state.marked,
      rows: this.state.rows,
      handleFlagged: this.handleFlagged,
      handleSelected: this.handleSelected,
      handleReset: this.handleReset
    });
  }
}

export default GameContext;
