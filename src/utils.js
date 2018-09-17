const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const inRange = (array, x, y) => {
  if (x < 0 || y < 0) {
    return false;
  } else {
    return array.length > x && array[x].length > y;
  }
};

const createBlankBoard = (height, width) => {
  const rows = [];
  let id = 0;
  for (let i = 0; i < height; i++) {
    const cells = [];
    for (let j = 0; j < width; j++) {
      cells.push({
        id: id++,
        x: i,
        y: j,
        isBomb: false,
        neighbors: 0,
        mode: 0
      });
    }
    rows.push(cells);
  }
  return rows;
};

const plantBombs = (board, total, height, width) => {
  const bombs = [];

  for (let i = 0; i < total + 1; i++) {
    const x = getRandomInt(0, height);
    const y = getRandomInt(0, width);
    bombs.push({ x: x, y: y });
  }

  bombs.forEach(bomb => {
    const { x, y } = bomb;
    if (!board[x][y].isBomb) {
      board[x][y].isBomb = true;
      // mark the bombs 8 neighbors
      inRange(board, x, y + 1) && board[x][y + 1].neighbors++;
      inRange(board, x, y - 1) && board[x][y - 1].neighbors++;
      inRange(board, x + 1, y + 1) && board[x + 1][y + 1].neighbors++;
      inRange(board, x + 1, y) && board[x + 1][y].neighbors++;
      inRange(board, x + 1, y - 1) && board[x + 1][y - 1].neighbors++;
      inRange(board, x - 1, y + 1) && board[x - 1][y + 1].neighbors++;
      inRange(board, x - 1, y) && board[x - 1][y].neighbors++;
      inRange(board, x - 1, y - 1) && board[x - 1][y - 1].neighbors++;
    }
  });
  return board;
};

export const revealCell = (rows, x, y) => {
  rows[x][y].mode = 2;
  return [...rows];
};

export const revealAllCells = (rows, x, y) => {
  rows.forEach(row => {
    row.forEach(cell => (cell.mode = 2));
  });
  return [...rows];
};

export const createBoard = (height, width, total) => {
  return plantBombs(createBlankBoard(height, width), total, height, width);
};
