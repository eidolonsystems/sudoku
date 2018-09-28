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
  displayMode: DisplayMode;
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



  public render(): JSX.Element {
    const displayPadding = (() => {
      if(this.props.displayMode === DisplayMode.LARGE) {
        return BoardView.BOARD_CONTAINER_STYLE.large;
      } else {
        return BoardView.BOARD_CONTAINER_STYLE.small;
      }
    })();
    const blockPadding = (() => {
      if(this.props.displayMode === DisplayMode.LARGE) {
        return BoardView.CELL_BLOCK_STYLE.large;
      } else {
        return BoardView.CELL_BLOCK_STYLE.small;
      }
    })();
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
              const currentCellRow = this.state.currentCell[0];
              const currentCellCol = this.state.currentCell[1];
              if(i === currentCellRow && j === currentCellCol) {
                stateOfCurrentCell = Cell.State.SELECTED;
              } else if(this.props.board.get(currentCellRow,
                currentCellCol) > 0) {
                if(this.props.board.get(currentCellRow,
                  currentCellCol) === this.props.board.get(i, j)
                  && this.state.isCurrentCellHovered) {
                  stateOfCurrentCell = Cell.State.TWIN;
                }
              } else {
                if(i === currentCellRow
                  || j === currentCellCol) {
                  stateOfCurrentCell = Cell.State.HILIGHTED;
                }
              }
            }
            cellBlock.push((<Cell
              key={i + ' ' + j}
              displaySize={this.props.displayMode}
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
          (<div style={{
            ...blockPadding,
            ...topPad, ...leftPad, ...rightPad, ...bottomPad
          }}>
            {cellBlock}
          </div>
          )
        );
      }
      return blocks;
    })();
    return (
      <div style={displayPadding}>{cells}</div>
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
    top: {
      paddingBottom: '5px',
      paddingTop: '0px'
    },
    // tslint:disable-next-line:object-literal-sort-keys
    bottom: {
      paddingBottom: '0px',
      paddingTop: '5px'
    },
    left: {
      paddingLeft: '0px',
      paddingRight: '5px'
    },
    right: {
      paddingLeft: '5px',
      paddingRight: '0px'
    },
    large: {
      alignItems: 'center' as 'center',
      backgroundColor: 'white',
      display: 'grid' as 'grid',
      gap: '5px',
      gridTemplateColumns: '40px 40px 40px',
      gridTemplateRows: '40px 40px 40px',
      justifyItems: 'center' as 'center'

    },
    small: {
      alignItems: 'center' as 'center',
      backgroundColor: 'white',
      display: 'grid' as 'grid',
      gap: '5px',
      gridTemplateColumns: '26px 26px 26px',
      gridTemplateRows: '26px 26px 26px',
      justifyItems: 'center' as 'center'

    }
  };
  private static readonly BOARD_CONTAINER_STYLE = {
    large: {
      backgroundColor: '#C8C8C8',
      display: 'grid' as 'grid',
      gap: '1px',
      gridTemplateColumns: '135px 140px 135px',
      gridTemplateRows: '135px 140px 135px',
      width: '412px'
    },
    small: {
        backgroundColor: '#C8C8C8',
        display: 'grid' as 'grid',
        gap: '1px',
        gridTemplateColumns: '93px 98px 93px',
        gridTemplateRows: '93px 98px 93px',
        width: '286px'
      }
    };
  }

export module BoardView {
  export const DisplaySize = DisplayMode;
}
