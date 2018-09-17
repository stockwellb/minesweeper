import React, { Component } from "react";
import { createBoard, revealCell, revealAllCells } from "../utils";

class Game extends Component {
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

  startTimer() {
    this.timer = setInterval(() => {
      this.setState((state, props) => {
        return { time: state.time + 1 };
      });
    }, 1000);
  }

  componentDidMount() {
    this.startTimer();
    this.setState({
      rows: createBoard(this.props.x, this.props.y, this.props.bombs)
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

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
        clearInterval(this.timer);
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

  handleReset() {
    this.setState({
      marked: this.props.bombs,
      time: 0,
      rows: createBoard(this.props.x, this.props.y, this.props.bombs)
    });
    clearInterval(this.timer);
    this.startTimer();
  }

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

export default Game;
