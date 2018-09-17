const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const checkIndex = (array, x, y) => {
  if (x < 0 || y < 0) {
    return false;
  }

  return array.length > x && array[x].length > y;
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
        mode: 2
      });
    }
    rows.push(cells);
  }
  return rows;
};

const plantBombs = (board, total, minX, maxX, minY, maxY) => {
  const bombs = [];

  for (let i = 0; i < total + 1; i++) {
    const x = getRandomInt(minX, maxX);
    const y = getRandomInt(minY, maxY);
    bombs.push({ x: x, y: y });
  }

  bombs.forEach(bomb => {
    const { x, y } = bomb;
    if (!board[x][y].isBomb) {
      board[x][y].isBomb = true;
      checkIndex(board, x, y + 1) && board[x][y + 1].neighbors++;
      checkIndex(board, x, y - 1) && board[x][y - 1].neighbors++;
      checkIndex(board, x + 1, y + 1) && board[x + 1][y + 1].neighbors++;
      checkIndex(board, x + 1, y) && board[x + 1][y].neighbors++;
      checkIndex(board, x + 1, y - 1) && board[x + 1][y - 1].neighbors++;
      checkIndex(board, x - 1, y + 1) && board[x - 1][y + 1].neighbors++;
      checkIndex(board, x - 1, y) && board[x - 1][y].neighbors++;
      checkIndex(board, x - 1, y - 1) && board[x - 1][y - 1].neighbors++;
    }
  });
  return board;
};

export const createBoard = (height, width, total) => {
  return plantBombs(
    createBlankBoard(height, width),
    total,
    0,
    height,
    0,
    width
  );
};
