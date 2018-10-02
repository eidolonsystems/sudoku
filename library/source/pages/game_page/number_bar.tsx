import * as React from 'react';
import { Board } from '../../';

enum DisplayMode {

  // Is this nessary????????

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {
  displayMode?: DisplayMode;
  onValueSelected(value: number): void;
}

/** Implements a component that displays number bar. */
export class NumberBar extends React.Component<Properties, {}> {
  constructor(props: Properties) {
    super(props);
    this.sendValue = this.sendValue.bind(this);
  }

  public render(): JSX.Element {
    const displaySize = (() => {
      if(this.props.displayMode === DisplayMode.LARGE) {
        return '200px';
      } else {
        return undefined;
      }
    })();
    const buttons = (() => {
      const buttonRow = [];
      for(let i = 1; i <= Board.ROWS; ++i) {
        buttonRow.push(
          <button
            onClick={this.sendValue(i)}
            style={NumberBar.BUTTON_STYLE}>
            {i}
          </button>
        );
      }
      return (<div style={NumberBar.BAR_BOX_STYLE}>{buttonRow}</div>);
    })();
    return (
      <div style={NumberBar.CONTAINER_STYLE}>{buttons}</div>
    );
  }

  private sendValue(value: number) {
    return (() => {
      this.props.onValueSelected(value);
    });
  }

  private static readonly BUTTON_STYLE = {
    fontFamily: 'Roboto' as 'Roboto',
    fontSize: '16px',
    height: '26px',
    width: '26px',
    borderRadius: '4px',
    borderStyle: 'solid' as 'solid',
    borderWidth: '1px',
    margin: '2.5px'
  };
  private static readonly BAR_BOX_STYLE = {
    borderColor: '#C8C8C8',
    borderRadius: '4px',
    borderStyle: 'solid' as 'solid',
    borderWidth: '0px',
    display: 'flexbox' as 'flexbox',
    padding: '7.5px'
  };
  private static readonly CONTAINER_STYLE = {
    textAlign: 'center' as 'center',
    verticalAlign: 'middle' as 'middle',
    borderColor: '#C8C8C8',
    borderRadius: '4px',
    borderStyle: 'solid' as 'solid',
    borderWidth: '1px',
    height: '46px',
    maxWidth: '412px',
    minWidth: '286px'
  };
}
