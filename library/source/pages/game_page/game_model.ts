import { Board } from '../..';

/** Model used to load game model?. */
export abstract class GameModel {

  /** Returns the start time. */
  public abstract getStartTime(): number;

  /** Returns the username. */
  public abstract getUsername(): string;

  /** Returns the initial Board. */
  public abstract getInitalBoard(): Board;

  /** Returns the current Board. */
  public abstract getCurrentBoard(): Board;
}
