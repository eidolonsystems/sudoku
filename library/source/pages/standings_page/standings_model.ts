import {StandingEntry} from '.';

/** Model used to load player standings. */
export abstract class StandingsModel {

  /** Returns the player standings. */
  public abstract getStandings(): StandingEntry[];

  /** Loads the model. */
  public abstract async load(): Promise<void>;
}
