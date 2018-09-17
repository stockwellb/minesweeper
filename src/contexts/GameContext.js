import React, { Component } from "react";
import { createBoard } from "../utils";

class GameContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      marked: 0,
      rows: []
    };
    this.handleFlagged = this.handleFlagged.bind(this);
    this.handleUnFlagged = this.handleUnFlagged.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.setState({
      rows: createBoard(this.props.x, this.props.y, this.props.bombs)
    });
  }

  handleFlagged(cell) {}

  handleUnFlagged(cell) {}

  handleSelected(cell) {}

  handleReset() {}

  render() {
    return this.props.children({
      time: this.state.time,
      marked: this.state.marked,
      rows: this.state.rows,
      handleFlagged: this.handleFlagged,
      handleUnFlagged: this.handleUnFlagged,
      handleSelected: this.handleSelected,
      handleReset: this.handleReset
    });
  }
}

export default GameContext;
