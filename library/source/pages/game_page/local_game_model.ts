import { GameModel } from '.';
import { Board } from '../../board';

// Implements GameModel. */
export class LocalGameModel implements GameModel {

  /** Constructs a local model.
   * @param username - name of the user
   * @param startTime - time the game started
   * @param initialBoard - what the board initally looks like
   */
  constructor(username: string, startTime: number, initBoard: Board) {
    this.username = username;
    this.startTime = startTime;
    this.initialBoard = initBoard;
    this.currentBoard = initBoard.clone();
  }

  /** Returns the start time. */
  public  getStartTime(): number {
    return this.startTime;
  }

  /** Returns the username. */
  public  getUsername(): string {
    return this.username;
  }

  /** Returns the initial Board. */
  public  getInitalBoard(): Board {
    return this.initialBoard;
  }

  /** Returns the current Board. */
  public getCurrentBoard(): Board {
    return this.currentBoard;
  }

  private username: string;
  private startTime: number;
  private initialBoard: Board;
  private currentBoard: Board;
}
