import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

interface Properties {
  /** The CSS style to apply. */
  style?: any;

  /** The callback when the button is clicked. */
  onClick(): void;

  /** Specifies if the button is on or off. */
  isOn: boolean;
}

/** Implements a cell of a sudoku board. */
export class EffectButton extends React.Component<Properties, {}> {
  constructor(props: Properties) {
    super(props);
  }

  public render(): JSX.Element {
    const image = (() => {
      if(this.props.isOn) {
        return 'resources/images/game_page/effect-grey.svg';
      } else {
        return 'resources/images/game_page/effect-green.svg';
      }
    })();
    return (
      <input type='image' onClick={this.props.onClick}
        style={this.props.style}
        className={css(EffectButton.NO_FOCUS_STYLE.default)}
        src={image}/>);
  }

  private static readonly NO_FOCUS_STYLE = StyleSheet.create({
    default: {
      height: '16px',
      width: '16px',
      ':focus': {
        outline: '0'
      },
      '::-moz-focus-inner': {
        border: '0'
      }
    }
  });
}
