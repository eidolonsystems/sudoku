import * as React from 'react';

interface Properties {
  /** The CSS style to apply. */
  style?: any;
}

interface State {
  currentSeconds: number;
}

/** Implements a cell of a sudoku board. */
export class Timer extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentSeconds: 0
    };
    this.updateTime = this.updateTime.bind(this);
  }

  public render(): JSX.Element {
    const seconds = (() => {
      const value = (this.state.currentSeconds % 60);
      return value.toString().padStart(2, '0');
    })();
    const min = (() => {
      const value = Math.floor(this.state.currentSeconds / 60);
      return value.toString().padStart(2, '0');
    })();
    return (
      <div style={this.props.style}>
        {min}:{seconds}
      </div>
    );
  }

  public componentDidMount() {
    this.timerID = setInterval(this.updateTime, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timerID);
  }

  private updateTime() {
    this.setState({currentSeconds: this.state.currentSeconds + 1});
  }

  private timerID = setInterval(undefined, 1000);
}
