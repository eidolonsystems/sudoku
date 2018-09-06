/** Represents a player's highest rank/time. */
export interface StandingEntry {

  /** The entry's rank among all standings. */
  rank: number;

  /** The name of the player. */
  name: string;

  /** The number of seconds needed to complete the game. */
  time: number;
}
