import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { BoardView } from '../../';

enum DisplayMode { // where should it's home be????

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

enum CellState { // This is proablt fine here

  /** The default state for all cells */
  NONE,

  /** The cell is the current cell the user is interacting with. */
  SELECTED,

  /** The cell shares a row/column with the currently selected cell. */
  HILIGHTED,

  /** The cell has the same value of the currently selected cell. */
  TWIN
}

interface Properties {
  displaySize: DisplayMode.SMALL;
  cellState: CellState;
  value: number;
  onClick(): void;
  onMouseEnter(): void;
  onMouseExit(): void;
}

export class Cell extends React.Component<Properties, {}> {

  constructor(props: Properties) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseExit = this.onMouseExit.bind(this);
  }

  public render(): JSX.Element {
    const BorderStyle = (() => {
      switch(this.props.cellState) {
        case CellState.SELECTED:
          return Cell.CELL_STYLE.selected;
        case CellState.HILIGHTED:
          if(this.props.value>0) {
            return Cell.CELL_STYLE.highlightedFilled;
          } else {
            return Cell.CELL_STYLE.hilighted;
          }
        case CellState.TWIN:
          return Cell.CELL_STYLE.twin;
        default:
          return undefined;
      }
    })();
    const DisplayValue = (() => {
      if(this.props.value===0) {
        return '';
      } else {
        return this.props.value;
      }
    })();
    return (
      <button onClick={this.onSelected}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseExit}
        className = {css(Cell.CELL_STYLE.default, BorderStyle)}
        style={Cell.TEXT_STYLE_SMALL}>
        {DisplayValue}
      </button >
    );
  }

  private onSelected(): void {
    this.props.onClick();
  }

  private onMouseOver(): void {
    if(this.props.cellState === Cell.State.SELECTED) {
      this.props.onMouseEnter();
    }
  }

  private onMouseExit(): void {
    if(this.props.cellState === Cell.State.SELECTED) {
      this.props.onMouseExit();
    }
  }

  private static readonly TEXT_STYLE_SMALL = {
    boxLayout: 'border-box' as 'border-box',
    fontSize: '16px',
    height: '26px',
    width: '26px',
    innerHeight: '26px',
    innerWidth: '26px'
  };
  private static readonly TEXT_STYLE_LARGE = {
    fontSize: '24px',
    height: '40px',
    width: '40px',
    innerHeight: '40px',
    innerWidth: '40px'
  };
  private static readonly CELL_STYLE = StyleSheet.create({
    default: {
      backgroundColor: '#FFFFFF',
      borderColor: '#EBEBEB',
      borderRadius: '4px',
      borderStyle: 'solid' as 'solid',
      borderWidth: '1px',
      color: '#000000',
      fontFamily: 'Roboto',
      textAlign: 'center' as 'center',
      verticalAlign: 'middle',
      // tslint:disable-next-line:object-literal-sort-keys
      ':focus': {
        outline: '0'
      },
      '::-moz-focus-inner': {
        border: '0'
      }
    },
    highlightedFilled: {
      backgroundColor: '#F8F8F8',
      borderColor: '##B9B4EC'
    },
    hilighted: {
      backgroundColor: '#F8F8F8'
    },
    selected: {
      ':hover': {
        borderColor: '#4B23A0'
      }
    },
    twin: {
      borderColor: '#00D3DB'
    }
  });
}

export module Cell {
  export const State = CellState;
  export const DisplaySize= DisplayMode;
}
