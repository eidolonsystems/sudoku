import {Expect, Test} from "alsatian";
import * as sudoku from 'sudoku';

/** Tests the Board class. */
export class BoardTester {

  /** Test constructing a board, expect all values to be 0/blank. */
  @Test()
  public testConstructor(): void {
    const b = new sudoku.Board();
    for(let i = 0; i < sudoku.Board.ROWS; ++i) {
      for(let j = 0; j < sudoku.Board.COLUMNS; ++j) {
        Expect(b.get(i, j)).toEqual(0);
      }
    }
  }

  /** Test getters/setters. */
  @Test()
  public testGetAndSet(): void {
    const b = new sudoku.Board();
    b.set(3, 3, 6);
    Expect(() => b.get(-1, 0)).toThrow();
    Expect(() => b.get(0, -1)).toThrow();
    Expect(() => b.get(9, 0)).toThrow();
    Expect(() => b.get(0, 9)).toThrow();
  }

  /** Test cloning. */
  @Test()
  public testCloning(): void {
    const originalBoard = new sudoku.Board();
    originalBoard.set(1, 3, 7);
    originalBoard.set(5, 2, 1);
    const clonedBoard = originalBoard.clone();
    for(let i = 0; i < sudoku.Board.ROWS; ++i) {
      for(let j = 0; j < sudoku.Board.COLUMNS; ++j) {
        Expect(originalBoard.get(i, j)).toEqual(clonedBoard.get(i, j));
      }
    }
  }

  /** Test generating a complete game board. */
  @Test()
  public testGeneratingCompleteBoard(): void {
    Expect(false).toEqual(true);
  }

  /** Test generating an incomplete game board. */
  @Test()
  public testGeneratingIncompleteBoard(): void {
    Expect(false).toEqual(true);
  }

  /** Test solving an incomplete board. */
  @Test()
  public testSolve(): void {
    Expect(false).toEqual(true);
  }
}
