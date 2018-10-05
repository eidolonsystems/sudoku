import { Expect, Test } from "alsatian";
import * as sudoku from 'sudoku';
import { Board } from "sudoku";


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
    const fullBoard = sudoku.generateBoard();
    for(let i = 0; i < sudoku.Board.ROWS; ++i) {
      for(let j = 0; j < sudoku.Board.COLUMNS; ++j) {
        Expect(fullBoard.get(i, j)).toBeGreaterThan(0);
      }
    }
  }

  /** Test generating an incomplete game board. */
  @Test()
  public testGeneratingIncompleteBoard(): void {
    const clues = 50;
    const board = sudoku.generateIncompleteBoard(clues);
    //const board = sudoku.generateBoard();
    let clueCells = 0;
    for(let i = 0; i < sudoku.Board.ROWS; ++i) {
      for(let j = 0; j < sudoku.Board.COLUMNS; ++j) {
        if(board.get(i, j) > 0) {
          ++clueCells;
        }
      }
    }
    Expect(clueCells).toEqual(clues);
  }

  /** Test solving an incomplete board. */
  @Test()
  public testSolve(): void {
    const b = new sudoku.Board();
    b.set(0, 0, 8);
    b.set(0, 1, 2);
    b.set(0, 2, 7);
    b.set(0, 3, 1);
    b.set(0, 4, 5);
    b.set(0, 5, 4);
    b.set(0, 6, 3);
    b.set(0, 7, 9);
    b.set(0, 8, 6);

    b.set(1, 0, 9);
    b.set(1, 1, 6);
    b.set(1, 2, 5);
    b.set(1, 3, 3);
    b.set(1, 4, 2);
    b.set(1, 5, 7);
    b.set(1, 6, 1);
    b.set(1, 7, 4);
    b.set(1, 8, 8);

    b.set(2, 0, 3);
    b.set(2, 1, 4);
    b.set(2, 2, 1);
    b.set(2, 3, 6);
    b.set(2, 4, 8);
    b.set(2, 5, 9);
    b.set(2, 6, 7);
    b.set(2, 7, 5);
    b.set(2, 8, 2);

    b.set(3, 0, 5);
    b.set(3, 1, 9);
    b.set(3, 2, 3);
    b.set(3, 3, 4);
    b.set(3, 4, 6);
    b.set(3, 5, 8);
    b.set(3, 6, 2);
    b.set(3, 7, 7);
    b.set(3, 8, 1);

    b.set(4, 0, 4);
    b.set(4, 1, 7);
    b.set(4, 2, 2);
    b.set(4, 3, 5);
    b.set(4, 4, 1);
    b.set(4, 5, 3);
    b.set(4, 6, 6);
    b.set(4, 7, 8);
    b.set(4, 8, 9);

    b.set(5, 0, 6);
    b.set(5, 1, 1);
    b.set(5, 2, 8);
    b.set(5, 3, 9);
    b.set(5, 4, 7);
    b.set(5, 5, 2);
    b.set(5, 6, 4);
    b.set(5, 7, 3);
    b.set(5, 8, 5);

    b.set(6, 0, 7);
    b.set(6, 1, 8);
    b.set(6, 2, 6);
    b.set(6, 3, 2);
    b.set(6, 4, 3);
    // the empty cell
    b.set(6, 6, 9);
    b.set(6, 7, 1);
    b.set(6, 8, 4);

    b.set(7, 0, 1);
    b.set(7, 1, 5);
    b.set(7, 2, 4);
    b.set(7, 3, 7);
    b.set(7, 4, 9);
    b.set(7, 5, 6);
    b.set(7, 6, 8);
    b.set(7, 7, 2);
    b.set(7, 8, 3);

    b.set(8, 0, 2);
    b.set(8, 1, 3);
    b.set(8, 2, 9);
    b.set(8, 3, 8);
    b.set(8, 4, 4);
    b.set(8, 5, 1);
    b.set(8, 6, 5);
    b.set(8, 7, 6);
    b.set(8, 8, 7);

    const solutionBoard = b.clone();
    solutionBoard.set(6, 5, 5);
    const solvedBoard = sudoku.solve(b);
    for(let i = 0; i < sudoku.Board.ROWS; ++i) {
      for(let j = 0; j < sudoku.Board.COLUMNS; ++j) {
        Expect(solvedBoard.get(i, j)).toEqual(solutionBoard.get(i, j));
      }
    }
    const emptyBoard = new sudoku.Board();
    Expect(sudoku.solve(emptyBoard)).toBeNull();
  }

  @Test()
  public testIsSolved(): void {
    const b = new sudoku.Board();
    b.set(0, 0, 8);
    b.set(0, 1, 2);
    b.set(0, 2, 7);
    b.set(0, 3, 1);
    b.set(0, 4, 5);
    b.set(0, 5, 4);
    b.set(0, 6, 3);
    b.set(0, 7, 9);
    b.set(0, 8, 6);

    b.set(1, 0, 9);
    b.set(1, 1, 6);
    b.set(1, 2, 5);
    b.set(1, 3, 3);
    b.set(1, 4, 2);
    b.set(1, 5, 7);
    b.set(1, 6, 1);
    b.set(1, 7, 4);
    b.set(1, 8, 8);

    b.set(2, 0, 3);
    b.set(2, 1, 4);
    b.set(2, 2, 1);
    b.set(2, 3, 6);
    b.set(2, 4, 8);
    b.set(2, 5, 9);
    b.set(2, 6, 7);
    b.set(2, 7, 5);
    b.set(2, 8, 2);

    b.set(3, 0, 5);
    b.set(3, 1, 9);
    b.set(3, 2, 3);
    b.set(3, 3, 4);
    b.set(3, 4, 6);
    b.set(3, 5, 8);
    b.set(3, 6, 2);
    b.set(3, 7, 7);
    b.set(3, 8, 1);

    b.set(4, 0, 4);
    b.set(4, 1, 7);
    b.set(4, 2, 2);
    b.set(4, 3, 5);
    b.set(4, 4, 1);
    b.set(4, 5, 3);
    b.set(4, 6, 6);
    b.set(4, 7, 8);
    b.set(4, 8, 9);

    b.set(5, 0, 6);
    b.set(5, 1, 1);
    b.set(5, 2, 8);
    b.set(5, 3, 9);
    b.set(5, 4, 7);
    b.set(5, 5, 2);
    b.set(5, 6, 4);
    b.set(5, 7, 3);
    b.set(5, 8, 5);

    b.set(6, 0, 7);
    b.set(6, 1, 8);
    b.set(6, 2, 6);
    b.set(6, 3, 2);
    b.set(6, 4, 3);
    b.set(6, 5, 5);
    b.set(6, 6, 9);
    b.set(6, 7, 1);
    b.set(6, 8, 4);

    b.set(7, 0, 1);
    b.set(7, 1, 5);
    b.set(7, 2, 4);
    b.set(7, 3, 7);
    b.set(7, 4, 9);
    b.set(7, 5, 6);
    b.set(7, 6, 8);
    b.set(7, 7, 2);
    b.set(7, 8, 3);

    b.set(8, 0, 2);
    b.set(8, 1, 3);
    b.set(8, 2, 9);
    b.set(8, 3, 8);
    b.set(8, 4, 4);
    b.set(8, 5, 1);
    b.set(8, 6, 5);
    b.set(8, 7, 6);
    b.set(8, 8, 7);

    Expect(sudoku.isSolved(b)).toEqual(true);
    b.set(8, 8, 2);
    b.set(7, 7, 2);
    Expect(sudoku.isSolved(b)).toEqual(false);
    b.set(8, 8, 0);
    b.set(7, 7, 0);
    Expect(sudoku.isSolved(b)).toEqual(false);
    const emptyBoard = new sudoku.Board();
    Expect(sudoku.isSolved(emptyBoard)).toEqual(false);
  }
}
