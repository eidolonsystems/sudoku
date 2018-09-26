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

  public render(): JSX.Element {
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
          cellRow.push((<Cell key={i + ' ' + j}
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

  protected onCellClicked(row: number, column: number): () => void {
    return (() => {
      let tuple: [number, number];
      tuple = [row, column];
      this.setState({ currentCell: tuple });
    });
  }

  protected onCellHovered(): () => void {
    return (() => this.setState({ isCurrentCellHovered: true }));
  }

  protected onCellNotHovered(): () => void {
    return (() => this.setState({ isCurrentCellHovered: false }));
  }

}
