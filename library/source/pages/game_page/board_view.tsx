import * as React from 'react';
import { Board } from '../../';
import { Cell } from '../../';

enum DisplayMode { // where should it's home be????

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {
  board: Board;
  hasEffects: boolean;
}

interface State {
  currentCell: [number, number];
  isCurrentCellHovered: boolean;
}

export class BoardView extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentCell: undefined,
      isCurrentCellHovered: false
    };
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onCellHovered = this.onCellHovered.bind(this);
    this.onCellNotHovered = this.onCellNotHovered.bind(this);
  }

  public render1(): JSX.Element {
    const cells = (() => {
      const rows = [];
      for(let i = 0; i < Board.ROWS; ++i) {
        const cellRow = [];
        for(let j = 0; j < Board.COLUMNS; ++j) {
          let stateOfCurrentCell = Cell.State.NONE;
          if(this.state.currentCell) {
            if(i === this.state.currentCell[0]
              && j === this.state.currentCell[1]) {
              stateOfCurrentCell = Cell.State.SELECTED;
            } else if(this.props.board.get(this.state.currentCell[0],
              this.state.currentCell[1]) > 0) {
              if(this.props.board.get(this.state.currentCell[0],
                this.state.currentCell[1]) === this.props.board.get(i, j)
                && this.state.isCurrentCellHovered) {
                stateOfCurrentCell = Cell.State.TWIN;
              }
            } else {
              if(i === this.state.currentCell[0]
                || j === this.state.currentCell[1]) {
                stateOfCurrentCell = Cell.State.HILIGHTED;
              }
            }
          }
          cellRow.push((<Cell
            key={i + ' ' + j}
            displaySize={Cell.DisplaySize.SMALL}
            cellState={stateOfCurrentCell}
            value={this.props.board.get(i, j)}
            onClick={this.onCellClicked(i, j)}
            onMouseEnter={this.onCellHovered()}
            onMouseExit={this.onCellNotHovered()}
          />));
        }
        rows.push(<div> {cellRow} </div>);
      }
      return rows;
    })();
    return (
      <div>{cells}</div>
    );
  }

  public render(): JSX.Element {
    const cells = (() => {
      const blocks = [];
      for(let g = 0; g < 9; ++g) {
        const cellBlock = [];
        const squareRowStart = Math.floor(g / 3) * 3;
        const squareColumnStart = (g % 3) * 3;
        for(let i = squareRowStart; i < squareRowStart + 3; ++i) {
          for(let j = squareColumnStart; j < squareColumnStart + 3; ++j) {
            let stateOfCurrentCell = Cell.State.NONE;
            if(this.state.currentCell) {
              if(i === this.state.currentCell[0]
                && j === this.state.currentCell[1]) {
                stateOfCurrentCell = Cell.State.SELECTED;
              } else if(this.props.board.get(this.state.currentCell[0],
                this.state.currentCell[1]) > 0) {
                if(this.props.board.get(this.state.currentCell[0],
                  this.state.currentCell[1]) === this.props.board.get(i, j)
                  && this.state.isCurrentCellHovered) {
                  stateOfCurrentCell = Cell.State.TWIN;
                }
              } else {
                if(i === this.state.currentCell[0]
                  || j === this.state.currentCell[1]) {
                  stateOfCurrentCell = Cell.State.HILIGHTED;
                }
              }
            }
            cellBlock.push((<Cell
              key={i + ' ' + j}
              displaySize={Cell.DisplaySize.SMALL}
              cellState={stateOfCurrentCell}
              value={this.props.board.get(i, j)}
              onClick={this.onCellClicked(i, j)}
              onMouseEnter={this.onCellHovered()}
              onMouseExit={this.onCellNotHovered()}
            />));
          }
        }
        let topPad = {};
        let bottomPad = {};
        let rightPad = {};
        let leftPad = {};
        let totalPadding = {}; // hmmmm
        if(squareRowStart <= 3) {
          topPad = BoardView.CELL_BLOCK_STYLE.top;
        }
        if(squareRowStart >= 3) {
          bottomPad = BoardView.CELL_BLOCK_STYLE.bottom;
        }
        if(squareColumnStart <= 3) {
          leftPad = BoardView.CELL_BLOCK_STYLE.left;
        }
        if(squareColumnStart >= 3) {
          rightPad = BoardView.CELL_BLOCK_STYLE.right;
        }
        blocks.push(
          (<div style={{...BoardView.CELL_BLOCK_STYLE.basic,
                        ...topPad, ...leftPad, ...rightPad, ...bottomPad}}>
            {cellBlock}
          </div>
          )
        );
      }
      return blocks;
    })();
    return (
      <div style={BoardView.BOARD_CONTAINER_STYLE}>{cells}</div>
    );
  }

  protected onCellClicked(row: number, column: number): () => void {
    return (() => {
      let tuple: [number, number];
      tuple = [row, column];
      this.setState({ currentCell: tuple });
      this.setState({ isCurrentCellHovered: true });
    });
  }

  protected onCellHovered(): () => void {
    return (() => this.setState({ isCurrentCellHovered: true }));
  }

  protected onCellNotHovered(): () => void {
    return (() => this.setState({ isCurrentCellHovered: false }));
  }

  private static readonly CELL_BLOCK_STYLE = {
    basic: {
      backgroundColor: 'white',
      display: 'grid' as 'grid',
      gridTemplateColumns: '26px 26px 26px',
      gridTemplateRows: '26px 26px 26px',
      // tslint:disable-next-line:object-literal-sort-keys
      alignItems: 'center' as 'center',
      justifyItems: 'center' as 'center',
      gap: '5px'
    },
    top: {
      paddingTop: '0px',
      paddingBottom: '5px'
    },
    bottom: {
      paddingTop: '5px',
      paddingBottom: '0px'
    },
    left: {
      paddingLeft: '0px',
      paddingRight: '5px'
    },
    right: {
      paddingLeft: '5px',
      paddingRight: '0px'
    }
  };
  private static readonly BOARD_CONTAINER_STYLE = {
    backgroundColor: '#C8C8C8',
    display: 'grid' as 'grid',
    gap: '1px',
    gridTemplateColumns: '93px 98px 93px',
    gridTemplateRows: '93px 98px 93px',
    width: '286px'
  };
}

export module BoardView {
  export const DisplaySize = DisplayMode;
}
