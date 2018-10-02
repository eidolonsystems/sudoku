import * as React from 'react';
import {HBoxLayout, Padding, VBoxLayout} from '../../layouts';
import { Board } from '../../';
import { BoardView } from '../../';
import { NumberBar } from './number_bar';

enum DisplayMode {

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {
  initialBoard: Board;
}

interface State {
  board: Board;
}

/** Implements a component that displays a sudoku board. */
export class GameController extends React.Component<Properties, State> {
  private myRef = React.createRef<BoardView>();
  constructor(props: Properties) {
    super(props);
    this.state = {
      board: this.props.initialBoard.clone()
    };
    //this.boardView = React.createRef();
    this.updateValue = this.updateValue.bind(this);
    this.updateCell = this.updateCell.bind(this);
  }
  public render(): JSX.Element {
    return (
      <VBoxLayout>
        <BoardView ref={this.myRef}
          board={this.state.board}
          hasEffects={true}
          displayMode={BoardView.Mode.LARGE} />
         <Padding size='17px'/>
        <NumberBar onValueSelected={this.updateCell} />
      </VBoxLayout>
    );
  }

  private updateValue() {
    const b = this.state.board.clone();
    b.set(0, 0, 5);
    this.setState({ board: b });
  }

  private updateCell(value: number) {
    const node = this.myRef.current;
    if(node) {
      const cell = node.getCurrentCell();
      if(cell) {
        this.state.board.set(cell[0], cell[1], value);
        this.myRef.current.forceUpdate();
      }
    }
  }
}
