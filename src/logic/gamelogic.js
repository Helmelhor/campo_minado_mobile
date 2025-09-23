// Função para criar o tabuleiro
export function createBoard(rows, cols, mines) {
  // Cria matriz vazia
  const board = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      opened: false,
      mined: false,
      flagged: false,
      exploded: false,
      nearMines: 0,
    }))
  );

  // Espalha minas
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].mined) {
      board[r][c].mined = true;
      minesPlaced++;
    }
  }

  // Conta minas vizinhas
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      board[r][c].nearMines = countMines(board, r, c);
    }
  }

  return board;
}

function countMines(board, row, col) {
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  let count = 0;
  for (const [dr, dc] of dirs) {
    const nr = row + dr, nc = col + dc;
    if (
      nr >= 0 && nr < board.length &&
      nc >= 0 && nc < board[0].length &&
      board[nr][nc].mined
    ) {
      count++;
    }
  }
  return count;
}

export function openCell(board, row, col) {
  const newBoard = board.map(rowArr => rowArr.map(cell => ({ ...cell })));
  const cell = newBoard[row][col];
  if (cell.opened || cell.flagged) return newBoard;
  cell.opened = true;
  if (cell.mined) {
    cell.exploded = true;
    // Revela todas as minas
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard[0].length; c++) {
        if (newBoard[r][c].mined) newBoard[r][c].opened = true;
      }
    }
    return newBoard;
  }
  if (cell.nearMines === 0) {
    // Abre vizinhos recursivamente
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    for (const [dr, dc] of dirs) {
      const nr = row + dr, nc = col + dc;
      if (
        nr >= 0 && nr < newBoard.length &&
        nc >= 0 && nc < newBoard[0].length &&
        !newBoard[nr][nc].opened
      ) {
        openCell(newBoard, nr, nc);
      }
    }
  }
  return newBoard;
}

export function toggleFlag(board, row, col) {
  const newBoard = board.map(rowArr => rowArr.map(cell => ({ ...cell })));
  const cell = newBoard[row][col];
  if (!cell.opened) cell.flagged = !cell.flagged;
  return newBoard;
}

export function checkWin(board, mines) {
  let opened = 0;
  let total = 0;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      total++;
      if (board[r][c].opened) opened++;
    }
  }
  return opened === total - mines;
}

export function checkLose(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c].exploded) return true;
    }
  }
  return false;
}