import * as React from 'react';

interface Properties {
  /** The CSS style to apply. */
  style?: any;
}

interface State {
  currentSeconds: number;
  currentMin: number;
}

/** Implements a cell of a sudoku board. */
export class Timer extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentMin: 0,
      currentSeconds: 0
    };
    this.updateTime = this.updateTime.bind(this);
  }

  public render(): JSX.Element {
    const seconds = (() => {
      if(this.state.currentSeconds <= 9) {
        return '0' + this.state.currentSeconds.toString();
      } else {
        return this.state.currentSeconds.toString();
      }
    })();
    const min = (() => {
      if(this.state.currentMin < 9) {
        return '0' + this.state.currentMin.toString();
      } else {
        return this.state.currentMin.toString();
      }
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
    if(this.state.currentSeconds === 59) {
      this.setState({currentSeconds: 0});
    } else {
      this.setState({currentSeconds: this.state.currentSeconds + 1});
    }
    if(this.state.currentSeconds === 0) {
      this.setState({currentMin: this.state.currentMin + 1});
    }
  }

  private timerID = setInterval(undefined, 1000);
}
