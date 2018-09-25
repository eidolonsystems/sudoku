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
}

export class BoardView extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      currentCell: undefined
    };
    this.onCellClicked = this.onCellClicked.bind(this);
  }

  public render(): JSX.Element {
    const cells = (() => {
      const rows = [];
      for(let i = 0; i < Board.ROWS; ++i) {
        const cellRow = [];
        for(let j = 0; j < Board.COLUMNS; ++j) {
          cellRow.push((<Cell cellState={Cell.State.NONE}
            value={this.props.board.get(i, j)}
            onClick={this.onCellClicked(i, j)}
            onHover={this.onCellHovered()}
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
    let tuple: [number, number];
    tuple = [row, column];
    return (() => this.setState({ currentCell: tuple }));
  }

  protected onCellHovered(): () => void{
    return (() => console.log('hmklmkfjkljdfgklgj)'));
  }

}
