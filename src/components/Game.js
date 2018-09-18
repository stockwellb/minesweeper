import { Component } from "react";
import { MineField } from "../minefield";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      marked: props.bombs,
      rows: []
    };
    this.mineField = new MineField({
      x: props.x,
      y: props.y,
      numberOfMines: props.bombs
    });
    this.handleFlagged = this.handleFlagged.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  startTimer() {
    this.mineField.start(time => {
      this.setState((state, props) => {
        return { time: time };
      });
    });
  }

  componentDidMount() {
    this.startTimer();
    this.setState({
      rows: this.mineField.field
    });
  }

  componentWillUnmount = () => {
    this.mineField.stop();
  };

  handleFlagged(x, y) {
    return e => {
      e.preventDefault();
      this.mineField.mark([x, y], field => {
        this.setState({ rows: field });
      });
    };
  }

  handleSelected(x, y) {
    return e => {
      this.mineField.reveal([x, y], field => {
        this.setState({ rows: field });
      });
    };
  }

  handleReset() {
    this.mineField.reset(field => {
      this.setState({
        marked: this.props.bombs,
        time: 0,
        rows: field
      });
    });
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
