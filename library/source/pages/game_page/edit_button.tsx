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
export class EditButton extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  public render(): JSX.Element {
    const source = (() => {
      if(this.state.isOn) {
        return 'resources/images/game_page/edit-green.svg';
      } else {
        return 'resources/images/game_page/edit-grey.svg';
      }
    })();
    return (
      <div style = {this.props.style}>
        <img src={source} height='16px' width='16px'/>
      </div>
    );
  }
}
