import { GameModel } from '.';
import { Board } from '../../board';

// Implements GameModel. */
export class LocalGameModel implements GameModel {

  /** Constructs a local model.
   * @param username - name of the user
   * @param startTime - time the game started
   * @param initialBoard - what the board initally looks like
   */
  constructor(username: string, startTime: number, initialBoard: Board) {
    this.username = username;
    this.startTime = startTime;
    this.initialBoard = initialBoard;
    this.currentBoard = initialBoard.clone();
  }

  public getStartTime(): number {
    return this.startTime;
  }

  public getUsername(): string {
    return this.username;
  }

  public getInitialBoard(): Board {
    return this.initialBoard;
  }

  public getCurrentBoard(): Board {
    return this.currentBoard;
  }

  private username: string;
  private startTime: number;
  private initialBoard: Board;
  private currentBoard: Board;
}
