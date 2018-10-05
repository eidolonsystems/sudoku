import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

interface Properties {
  /** The CSS style to apply. */
  style?: any;
}

interface State {
  isOn: boolean;
}

/** Implements a cell of a sudoku board. */
export class EffectButton extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  public render(): JSX.Element {
    const image = (() => {
      if(this.state.isOn) {
        return (<img src='resources/images/game_page/effect-green.svg'
          width='16px' height='16px'/>);
      } else {
        return (<img src='resources/images/game_page/effect-grey.svg'
          width='16px' height='16px'/>);
      }
    })();
    return (
      <div style = {this.props.style}>
        {image}
      </div>
    );
  }
}
