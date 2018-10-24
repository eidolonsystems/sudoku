import * as React from 'react';

interface Properties {
  /** The time the timer started at. */
  startTime: number;

  /** The CSS style to apply. */
  style?: any;
}

/** Implements a timer. */
export class Timer extends React.Component<Properties, {}> {
  constructor(props: Properties) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  public render(): JSX.Element {
    const currentTime = (Date.now() - this.props.startTime) / 1000 ;
    const seconds = (() => {
      const value = (currentTime % 60);
      return value.toFixed(0).toString().padStart(2, '0');
    })();
    const minutes = (() => {
      const value = Math.floor(currentTime / 60);
      return value.toFixed(0).toString().padStart(2, '0');
    })();
    return (
      <div style={this.props.style}>
        {minutes}:{seconds}
      </div>);
  }

  public componentDidMount() {
    console.log('Timer is mounted?');
    setInterval(this.forceUpdate, 1000);
  }

  public componentWillUnmount() {
    console.log('Timer is unmounted?');
    clearInterval();
  }
}
