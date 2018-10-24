import { StandingEntry, StandingsModel } from '.';

/** Implements the standings using local memory. */
export class LocalStandingsModel implements StandingsModel {

  /** Constructs a local model.
   * @param standings - The list of standings to represent.
   * @param loadTime - The number of milliseconds used to simulate load time.
   */
  constructor(standings: StandingEntry[], loadTime: number = 0) {
    this.loadTime = loadTime;
    this.isLoaded = false;
    this.standings = standings.slice();
  }

  public getStandings(): StandingEntry[] {
    if(!this.isLoaded) {
      throw new Error('Model not loaded.');
    }
    return this.standings;
  }

  public async load(): Promise<void> {
    if(this.isLoaded) {
      return;
    }
    if(this.loadTime === 0) {
      this.isLoaded = true;
      return;
    }
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.isLoaded = true;
        resolve();
      }, this.loadTime);
    });
  }

  private loadTime: number;
  private isLoaded: boolean;
  private standings: StandingEntry[];
}
