import * as React from 'react';
import { Board } from '../../';
import { Cell } from '../../';

enum DisplayMode {

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {

  /** A 2D array that documents the values of all cells on the board. */
  currentBoard: Board;

  /** A 2D array that documents the values of all cells on the board. */
  initialBoard: Board;

  /** Used to determine if effects on cells that are not the selected cell
   * should be shown.
   */
  hasEffects: boolean;

  /**  Specifies what size the board shouuld be displayed at. */
  displayMode: DisplayMode;
}

interface State {
  currentCell: [number, number];
  isCurrentCellHovered: boolean;
  hoveredCell: [number, number];
}

/** Implements a component that displays a sudoku board. */
export class BoardView extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentCell: undefined,
      hoveredCell: undefined,
      isCurrentCellHovered: false
    };
    this.onCellClicked = this.onCellClicked.bind(this);
    this.onCellHovered = this.onCellHovered.bind(this);
    this.onCellNotHoveredWithE = this.onCellNotHoveredWithE.bind(this);
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
      for(let g = 0; g < Board.ROWS; ++g) {
        const cellBlock = [];
        const squareRowStart = Math.floor(g / 3) * 3;
        const squareColumnStart = (g % 3) * 3;
        for(let i = squareRowStart; i < squareRowStart + 3; ++i) {
          for(let j = squareColumnStart; j < squareColumnStart + 3; ++j) {
            const cellState = this.getCellState(i, j);
            let isClueCell = false;
            if(this.props.initialBoard.get(i, j) > 0) {
              isClueCell = true;
            }
            cellBlock.push(<Cell
              key={i + ' ' + j}
              displayMode={this.props.displayMode}
              cellState={cellState}
              isClue={isClueCell}
              value={this.props.currentBoard.get(i, j)}
              onClick={this.onCellClicked(i, j)}
              onMouseEnter={this.onCellHovered(i, j)}
              onMouseExit={this.onCellNotHoveredWithE}
            />);
          }
        }
        let topPad = {};
        let bottomPad = {};
        let rightPad = {};
        let leftPad = {};
        if(squareRowStart <= Board.ROWS / 3) {
          topPad = BoardView.CELL_BLOCK_STYLE.top;
        }
        if(squareRowStart >= Board.ROWS / 3) {
          bottomPad = BoardView.CELL_BLOCK_STYLE.bottom;
        }
        if(squareColumnStart <= Board.COLUMNS / 3) {
          leftPad = BoardView.CELL_BLOCK_STYLE.left;
        }
        if(squareColumnStart >= Board.COLUMNS / 3) {
          rightPad = BoardView.CELL_BLOCK_STYLE.right;
        }
        blocks.push(
          (<div style={{
            ...blockPadding,
            ...topPad, ...leftPad, ...rightPad, ...bottomPad
          }}>
            {cellBlock}
          </div>));
      }
      return blocks;
    })();
    return (
      <div style={displayPadding}>{cells}</div>
    );
  }

  /** Returns a tuple representing the coordinates of the current cell. */
  public getCurrentCell(): [number, number] {
    return this.state.currentCell;
  }

  private getCellState(row: number, col: number) {
    let cellState = Cell.State.NONE;
    let hoveredCellValue = -1;
    if(this.state.hoveredCell && this.props.hasEffects) {
      const hoveredCellRow = this.state.hoveredCell[0];
      const hoveredCellCol = this.state.hoveredCell[1];
      hoveredCellValue = this.props.currentBoard.get(
        hoveredCellRow, hoveredCellCol);
      if(hoveredCellRow !== row || hoveredCellCol !== col) {
        if(hoveredCellValue > 0) {
          if(hoveredCellValue === this.props.currentBoard.get(row, col)) {
            cellState = Cell.State.TWIN;
          }
        } else if(row === hoveredCellRow || col === hoveredCellCol) {
          cellState = Cell.State.HIGHLIGHTED;
        }
      }
    }
    if(this.state.currentCell) {
      const currentCellRow = this.state.currentCell[0];
      const currentCellCol = this.state.currentCell[1];
      const currentCellValue = this.props.currentBoard.get(
        currentCellRow, currentCellCol);
      if(row === currentCellRow && col === currentCellCol) {
          cellState = Cell.State.SELECTED;
      } else if((row === currentCellRow || col === currentCellCol)
        && hoveredCellValue > 0) {
        cellState = Cell.State.HIGHLIGHTED;
      } else if(currentCellValue > 0) {
        if(currentCellValue === this.props.currentBoard.get(row, col) &&
          (hoveredCellValue < 1)) {
          cellState = Cell.State.TWIN;
        }
      }
    }
    return cellState;
  }

  private onCellClicked(row: number, column: number) {
    return (() => {
      if(this.props.initialBoard.get(row, column) === 0) {
        this.setState({
          currentCell: [row, column],
          isCurrentCellHovered: true
        });
      }
    });
  }

  private onCellHovered(row: number, column: number) {
    return (() => {
      this.setState({
        hoveredCell: [row, column]
      });
    });
  }

  private onCellNotHoveredWithE() {
    this.setState({ hoveredCell: undefined, isCurrentCellHovered: false });
  }

  private static readonly CELL_BLOCK_STYLE = {
    top: {
      paddingBottom: '5px',
      paddingTop: '0px'
    },
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
  export const Mode = DisplayMode;
}
