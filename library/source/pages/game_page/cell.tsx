import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

enum DisplayMode {

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

enum CellState {

  /** The default state for all cells. */
  NONE,

  /** The cell is the current cell the user is interacting with. */
  SELECTED,

  /** The cell shares a row/column with the currently selected cell. */
  HIGHLIGHTED,

  /** The cell has the same (non-zero) value of the currently selected cell. */
  TWIN
}

interface Properties {

  /**  Specifies what size the cell shouuld be displayed at. */
  displayMode: DisplayMode;

  /** Specifies the state of the cell. */
  cellState: CellState;

  /** Specifies if the cell is a clue cell. */
  isClue: boolean;

  /** The value that the cell holds */
  value: number;

  /** Callback when the cell is clicked on. */
  onClick(): void;

  /** Callback when the mouse enters the cell. */
  onMouseEnter(): void;

  /** Callback when the mouse leaves the cell. */
  onMouseLeave(): void;

  /**Additonal style info Cell might need. Specifically padding. */
  style?: any;
}

/** Implements a cell of a sudoku board. */
export class Cell extends React.Component<Properties, {}> {
  constructor(props: Properties) {
    super(props);
  }

  public render(): JSX.Element {
    const baseStyle = (() => {
      if(this.props.isClue) {
        return Cell.CELL_STYLE.clueDefault;
      } else {
        return Cell.CELL_STYLE.default;
      }
    })();
    const cellTextStyle = (() => {
      if(this.props.displayMode === DisplayMode.LARGE) {
        return Cell.CELL_STYLE.large;
      } else {
        return Cell.CELL_STYLE.small;
      }
    })();
    const borderStyle = (() => {
      switch(this.props.cellState) {
        case CellState.SELECTED:
          return Cell.CELL_STYLE.selected;
        case CellState.HIGHLIGHTED:
          if(this.props.value > 0) {
            return Cell.CELL_STYLE.highlightedFilled;
          } else {
            return Cell.CELL_STYLE.highlighted;
          }
        case CellState.TWIN:
          return Cell.CELL_STYLE.twin;
        default:
          return undefined;
      }
    })();
    const cellValue = (() => {
      if(this.props.value === 0) {
        return '';
      } else {
        return this.props.value;
      }
    })();
    return (
      <button tabIndex={-1}
          onClick={this.props.onClick}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          className={css(baseStyle, cellTextStyle, borderStyle)}
          style={this.props.style}>
        {cellValue}
      </button>);
  }

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
      verticalAlign: 'middle' as 'middle',
      padding: '0px',
      ':hover': {
        borderColor: '#4B23A0'
      },
      ':focus': {
        outline: '0'
      },
      '::-moz-focus-inner': {
        border: '0'
      }
    },
    large: {
      boxSizing: 'border-box' as 'border-box',
      fontSize: '24px',
      height: '40px',
      maxWidth: '40px',
      width: '40px',
    },
    small: {
      boxSizing: 'border-box' as 'border-box',
      fontSize: '16px',
      height: '26px',
      width: '26px',
      maxWidth: '40px',
    },
    highlightedFilled: {
      backgroundColor: '#F8F8F8',
      borderColor: '#B9B4EC'
    },
    highlighted: {
      backgroundColor: '#F8F8F8'
    },
    selected: {
      borderColor: '#4B23A0'
    },
    twin: {
      borderColor: '#00D3DB'
    },
    clueDefault: {
      backgroundColor: '#F8F8F8',
      borderColor: '#F8F8F8',
      borderRadius: '4px',
      borderStyle: 'solid' as 'solid',
      borderWidth: '1px',
      color: '#4B23A0',
      fontFamily: 'Roboto',
      textAlign: 'center' as 'center',
      verticalAlign: 'middle' as 'middle',
      padding: '0px',
      ':hover': {
        borderColor: '#4B23A0'
      },
      ':focus': {
        outline: '0'
      },
      '::-moz-focus-inner': {
        border: '0'
      }
    }
  });
}

export module Cell {
  export const State = CellState;
  export const Mode = DisplayMode;
}
