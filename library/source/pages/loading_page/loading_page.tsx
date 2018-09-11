import * as React from 'react';

enum Breakpoint {

  /** Page is between 0 and 559 pixels (inclusive). */
  SMALL,

  /** Page is between 560 and 1039 pixels (inclusive). */
  MEDIUM,

  /** Page is equal or greater than 1040 pixels. */
  LARGE
}

interface State {
  breakpoint: Breakpoint;
}

/** Displays the loading page. Used to transition between pages where data
    needs to be loaded.
*/
export class LoadingPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      breakpoint: Breakpoint.LARGE
    };
  }

  public render(): JSX.Element {
    return <div>Page is loading!</div>;
  }
}
