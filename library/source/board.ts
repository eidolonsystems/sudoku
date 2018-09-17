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
    return null;
  }

  private values: number[][];
}

/** Generates a solved Sudoku board. */
export function generateBoard(): Board {
  return new Board();
}

/** Returns true iff the board represents a solution to a Sudoku puzzle.
 * @param board - The board to test.
 * @return true iff the board is a solution.
 */
export function isSolved(board: Board): boolean {
  return false;
}

/** Returns a solved version of a Sudoku board.
 * @param board - The board to solve.
 * @return A solved instance of the board, or null if no solution exists or
 *         the solution is not unique. The return value will always be a
 *         distinct object from the board argument.
 */
export function solve(board: Board): Board {
  return null;
}
