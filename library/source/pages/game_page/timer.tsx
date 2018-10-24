import * as React from 'react';

interface Properties {
  /** The time the timer started at. */
  startTime: number;

  /** The CSS style to apply. */
  style?: any;
}

interface State {
  currentTime: number;
}

/** Implements a timer. */
export class Timer extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentTime: (Date.now() - this.props.startTime) / 1000
    };
    this.updateTime = this.updateTime.bind(this);
  }

  public render(): JSX.Element {
    const seconds = (() => {
      const value = (this.state.currentTime % 60);
      return value.toFixed(0).toString().padStart(2, '0');
    })();
    const minutes = (() => {
      const value = Math.floor(this.state.currentTime / 60);
      return value.toFixed(0).toString().padStart(2, '0');
    })();
    return (
      <div style={this.props.style}>
        {minutes}:{seconds}
      </div>);
  }

  public componentDidMount() {
    setInterval(this.updateTime, 1000);
  }

  public componentWillUnmount() {
    clearInterval();
  }

  private updateTime() {
    this.setState({currentTime: (Date.now() - this.props.startTime) / 1000 });
  }
}
