/** Represents a standard 9x9 Sudoku board. Each position on the board is
 *  a number from [0-9] where 0 indicates a blank space.
 */
export class Board {
  public static ROWS = 9;
  public static COLUMNS = 9;

  /** Constructs a blank board. */
  constructor() {
    this.values = [];
    for(let i = 0; i < Board.ROWS; ++i) {
      this.values[i] = [];
      for(let j = 0; j < Board.COLUMNS; ++j) {
        this.values[i].push(0);
      }
    }
  }

  /** Returns the value at a specified row and column.
   * @param row - The row to access.
   * @param column - The column to access.
   * @return A value from [0-9] at the specified row and column where 0
   *         indicates a blank square.
   * @throws RangeError - The row or column is out of range of the board.
   */
  public get(row: number, column: number): number {
    if(row < 0 || row >= Board.ROWS || column < 0 || column >= Board.COLUMNS) {
      throw new RangeError('Board coordinates out of bounds.');
    }
    return this.values[row][column];
  }

  /** Sets the value at a specified row and column.
   * @param row - The row to set.
   * @param column - The column to set.
   * @param value - The value between [0-9] to set at the row and column.
   * @throws RangeError - The row or column is out of range of the board or the
   *         value is not in the range [0-9].
   */
  public set(row: number, column: number, value: number): void {
    if(row < 0 || row >= Board.ROWS || column < 0 || column >= Board.COLUMNS) {
      throw new RangeError('Board coordinates out of bounds.');
    }
    if(value < 0 || value > 9) {
      throw new RangeError('Value is out of bounds.');
    }
    this.values[row][column] = value;
  }

  /** Returns a copy of this board. */
  public clone(): Board {
    const copy = new Board();
    for(let i = 0; i < Board.ROWS; ++i) {
      for(let j = 0; j < Board.COLUMNS; ++j) {
        copy.set(i, j, this.get(i, j));
      }
    }
    return copy;
  }
  private values: number[][];
}

/** Generates a solved Sudoku board. */
export function generateBoard(): Board {
  const board = new Board();
  fillCell(board, 0, 0);
  return board;
}

function fillCell(board: Board, row: number, column: number): boolean {
  if(row === Board.ROWS) {
    return true;
  }
  let solutionExists = false;
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let candidate = 0;
  if(board.get(row, column) !== 0) {
    if((column + 1) === Board.COLUMNS) {
        return fillCell(board, row + 1, 0);
    } else {
      return fillCell(board, row, column + 1);
    }
  } else {
    candidate = values[Math.floor(Math.random() * values.length)];
  }
  while(values.length !== 0) {
    if(isValidIfSet(board, row, column, candidate)) {
      board.set(row, column, candidate);
      if((column + 1) === Board.COLUMNS) {
        solutionExists = fillCell(board, row + 1, 0);
      } else {
      solutionExists = fillCell(board, row, column + 1);
      }
    }
    if(solutionExists) {
      return true;
    } else {
      const pos = values.indexOf(candidate);
      values.splice(pos, 1);
      board.set(row, column, 0);
      candidate = values[Math.floor(Math.random() * values.length)];
    }
  }
  return false;
}

/** Returns true iff the board represents a solution to a Sudoku puzzle.
 * @param board - The board to test.
 * @return true iff the board is a solution.
 */
export function isSolved(board: Board): boolean {
  let num = [0];
  for(let i = 0; i < Board.ROWS; ++i) {
    num = [0];
    for(let j = 0; j < Board.COLUMNS; ++j) {
       if(num.includes(board.get(i, j))) {
         return false;
       }
       num.push(board.get(i, j));
    }
  }
  for(let j = 0; j < Board.COLUMNS; ++j) {
    num = [0];
    for(let i = 0; i < Board.ROWS; ++i) {
      if(num.includes(board.get(i, j))) {
         return false;
      }
      num.push(board.get(i, j));
    }
  }
  let squareRowStart = 0;
  let squareColumnStart = 0;
  for(let g = 0; g < 9; ++g) {
    switch (g) {
      case 0: squareRowStart = 0; squareColumnStart = 0; break;
      case 1: squareRowStart = 0; squareColumnStart = 3; break;
      case 2: squareRowStart = 0; squareColumnStart = 6; break;
      case 3: squareRowStart = 3; squareColumnStart = 0; break;
      case 4: squareRowStart = 3; squareColumnStart = 3; break;
      case 5: squareRowStart = 3; squareColumnStart = 6; break;
      case 6: squareRowStart = 6; squareColumnStart = 0; break;
      case 7: squareRowStart = 6; squareColumnStart = 3; break;
      case 8: squareRowStart = 6; squareColumnStart = 6; break;
    }
    num = [0];
    for(let i = squareRowStart; i < squareRowStart + 3; ++i) {
      for(let j = squareColumnStart; j < squareColumnStart + 3; ++j) {
        if(num.includes(board.get(i, j))) {
          return false;
        }
        num.push(board.get(i,j));
        }
    }
  }
  return true;
}

/** Returns a solved version of a Sudoku board.
 * @param board - The board to solve.
 * @return A solved instance of the board, or null if no solution exists or
 *         the solution is not unique. The return value will always be a
 *         distinct object from the board argument.
 */
export function solve(board: Board): Board {
  if(solveHelper(board, 0, 0)) {
    return board;
  } else {
    return null;
  }
}

function solveHelper(board: Board, row: number, col: number): boolean {
  if(row === Board.ROWS) {
    return true;
  }
  let solutionExists = false;
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if(board.get(row,col) !== 0) {
    if(col + 1 === Board.COLUMNS) {
        return solveHelper(board, row + 1, 0);
      } else {
        return solveHelper(board, row, col + 1);
      }
  } else {
    const alternativeBoard = board.clone();
    let val = values[Math.floor(Math.random() * values.length)];
    while(values.length !== 0) {
      if(isValidIfSet(board, row, col, val)) {
        board.set(row, col, val);
        if(col + 1 === Board.COLUMNS) {
          solutionExists = solveHelper(board, row + 1, 0);
        } else {
          solutionExists = solveHelper(board, row, col + 1);
        }
      }
      const pos = values.indexOf(val);
      values.splice(pos, 1);
      if(solutionExists) {
        for(let i = 0; i < values.length; ++i) {
          const altCanidate = values[i];
          if(isValidIfSet(alternativeBoard, row, col, values[i])) {
            alternativeBoard.set(row, col, altCanidate);
            if(fillCell(alternativeBoard, row, col)) {
              return false;
            }
          }
          alternativeBoard.set(row, col, 0);
        }
        return true;
      } else {
        board.set(row, col, 0);
        val = values[Math.floor(Math.random() * values.length)];
      }
    }
  }
  return false;
}

/** Checks if the value was set a certain cell the board remains valid */
function isValidIfSet(board: Board,
    row: number, column: number, value: number): boolean {
  if(row < 0 || row >= Board.ROWS || column < 0 || column >= Board.COLUMNS) {
    throw new RangeError('Board coordinates out of bounds.');
  }
  if (value < 0 || value > 9) {
    throw new RangeError('Value is out of bounds.');
  }
  for(let i = 0; i < Board.ROWS; ++i) {
    if(value === board.get(i, column) && i !== row) {
      return false;
    }
  }
  for(let i = 0; i < Board.COLUMNS; ++i) {
    if(value === board.get(row, i) && i !== column) {
      return false;
    }
  }
  let squareRowStart = 0;
  let squareColumnStart = 0;
  switch (row) {
    case 0: case 1: case 2: squareRowStart = 0; break;
    case 3: case 4: case 5: squareRowStart = 3; break;
    case 6: case 7: case 8: squareRowStart = 6; break;
  }
  switch (column) {
    case 0: case 1: case 2: squareColumnStart = 0; break;
    case 3: case 4: case 5: squareColumnStart = 3; break;
    case 6: case 7: case 8: squareColumnStart = 6; break;
  }
  for(let i = squareRowStart; i < squareRowStart + 3; ++i) {
    for(let j = squareColumnStart; j < squareColumnStart + 3; ++j) {
      if(value === board.get(i, j) && i !== row && j !== column) {
        return false;
      }
    }
  }
  return true;
}
