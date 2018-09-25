import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

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
  cellState?: CellState;
  value?: number;
  onClick(): void;
  onHover(): void;
}

export class Cell extends React.Component<Properties, {}> {

  constructor(props: Properties) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
  }

  public render(): JSX.Element {
    const BorderStyle = (() => {
      switch(this.props.cellState) {
        case CellState.SELECTED:
          Cell.CELL_STYLE.selected;
        case CellState.HILIGHTED:
          if(this.props.value>0) {
            Cell.CELL_STYLE.highlightedFilled;
          } else {
            Cell.CELL_STYLE.hilighted;
          }
        case CellState.TWIN:
          return Cell.CELL_STYLE.twin;
        default:
          return undefined;
      }
    })();
    return (
      <button onClick={this.onSelected}
        onMouseOver={this.onHovered}
        className = {css(Cell.CELL_STYLE.default, BorderStyle)}>
        {this.props.value}
      </button >
    );
  }

  public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    if(this.props.cellState !== nextProps.cellState) {
      return true;
    }
    return false;
  }

  private onSelected(): void {
    this.props.onClick();
  }

  private onHovered(): void {
    if(this.props.cellState) {
      this.props.onHover();
    }
  }

  private static readonly TEXT_STYLE_SMALL = {
    fontSize: '16px',
    height: '26px',
    width: '26px'
  };
  private static readonly TEXT_STYLE_LARGE = {
    fontSize: '24px',
    height: '40px',
    width: '40px'
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
      verticalAlign: 'middle'
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
}
