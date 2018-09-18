import { gameStates, cellStates } from "./states";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const numbers = [
  cellStates.one,
  cellStates.two,
  cellStates.three,
  cellStates.four,
  cellStates.five,
  cellStates.six,
  cellStates.seven,
  cellStates.eight
];

export class MineField {
  constructor({ x = 10, y = 10, numberOfMines = 5 }) {
    this.dimensions = [x, y];
    this.numberOfMines = numberOfMines;
    this.state = gameStates.INITIALIZED;
    this.elapsedTime = 0;
    this.field = this.plantMines(
      this.createBlankField(this.dimensions),
      this.numberOfMines,
      this.dimensions
    );
  }

  start(callback) {
    this.timer = setInterval(() => {
      if (this.state === gameStates.IN_PROGRESS) {
        this.elapsedTime++;
        callback(this.elapsedTime);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  reset(callback) {
    this.state = gameStates.INITIALIZED;
    this.elapsedTime = 0;
    this.field = this.plantMines(
      this.createBlankField(this.dimensions),
      this.numberOfMines,
      this.dimensions
    );
    callback([...this.field]);
  }

  reveal([x, y], callback) {
    if (this.state === gameStates.INITIALIZED) {
      this.state = gameStates.IN_PROGRESS;
    }
    const cell = this.field[x][y];
    if (cell.isMine && cell.state === cellStates.HIDDEN) {
      cell.state = cellStates.EXPLODED_MINE;
      this.state = gameStates.LOST;
      this.revealAll();
    } else if (cell.neighbors > 0) {
      cell.state = String(cell.neighbors);
    } else {
      cell.state = cellStates.EMPTY;
    }
    callback([...this.field]);
  }

  mark([x, y], callback) {
    const lookup = {
      [cellStates.HIDDEN]: cellStates.MARKED_MINE,
      [cellStates.MARKED_MINE]: cellStates.MARKED_QUESTION,
      [cellStates.MARKED_QUESTION]: cellStates.HIDDEN
    };
    const cell = this.field[x][y];
    cell.state = lookup[cell.state] || cellStates.HIDDEN;
    callback([...this.field]);
  }

  revealAll() {
    const lookup = {
      [`true-${cellStates.HIDDEN}`]: cellStates.MINE,
      [`true-${cellStates.EXPLODED_MINE}`]: cellStates.EXPLODED_MINE,
      [`true-${cellStates.zero}`]: cellStates.MINE,
      [`true-${cellStates.one}`]: cellStates.MINE,
      [`true-${cellStates.two}`]: cellStates.MINE,
      [`true-${cellStates.three}`]: cellStates.MINE,
      [`true-${cellStates.four}`]: cellStates.MINE,
      [`true-${cellStates.five}`]: cellStates.MINE,
      [`true-${cellStates.six}`]: cellStates.MINE,
      [`true-${cellStates.seven}`]: cellStates.MINE,
      [`true-${cellStates.eight}`]: cellStates.MINE
    };
    this.field.forEach(row => {
      row.forEach(cell => {
        const key = `${cell.isMine}-${cell.state}`;
        cell.state = lookup[key] || cell.state;

        if (!cell.isMine && cell.neighbors > 0) {
          cell.state = String(cell.neighbors);
        }

        if (!cell.isMine && cell.neighbors === 0) {
          cell.state = cellStates.EMPTY;
        }
      });
    });
  }

  outOfBounds([row, column]) {
    return (
      row < 0 ||
      row > this.dimensions[0] - 1 ||
      column < 0 ||
      column > this.dimensions[1] - 1
    );
  }

  createBlankField([rows, columns]) {
    const field = [];
    let id = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const cell = {
          id: id++,
          x: i,
          y: j,
          isMine: false,
          neighbors: 0,
          state: cellStates.HIDDEN
        };
        row.push(cell);
      }
      field.push(row);
    }
    return field;
  }

  plantMines(field, total, [rows, columns]) {
    const mines = [];

    for (let i = 0; i <= total; i++) {
      const x = getRandomInt(0, rows - 1);
      const y = getRandomInt(0, columns - 1);
      mines.push([x, y]);
    }

    mines.forEach(bomb => {
      const [x, y] = bomb;
      if (!field[x][y].isMine) {
        field[x][y].isMine = true;
        // mark the mines 8 neighbors
        !this.outOfBounds([x, y + 1]) && field[x][y + 1].neighbors++;
        !this.outOfBounds([x, y - 1]) && field[x][y - 1].neighbors++;
        !this.outOfBounds([x + 1, y + 1]) && field[x + 1][y + 1].neighbors++;
        !this.outOfBounds([x + 1, y]) && field[x + 1][y].neighbors++;
        !this.outOfBounds([x + 1, y - 1]) && field[x + 1][y - 1].neighbors++;
        !this.outOfBounds([x - 1, y + 1]) && field[x - 1][y + 1].neighbors++;
        !this.outOfBounds([x - 1, y]) && field[x - 1][y].neighbors++;
        !this.outOfBounds([x - 1, y - 1]) && field[x - 1][y - 1].neighbors++;
      }
    });
    return field;
  }
}
