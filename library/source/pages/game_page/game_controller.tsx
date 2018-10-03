import * as React from 'react';
import { Board } from '../../';
import { BoardView } from '../../';
import { HBoxLayout, Padding, VBoxLayout } from '../../layouts';

import { NumberBar } from './number_bar';

enum DisplayMode {

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {

  /** The original state of the board. */
  initialBoard: Board;
}

interface State {
  board: Board;
  displayMode: DisplayMode;

}

/** Implements a component that displays a sudoku board. */
export class GameController extends React.Component<Properties, State> {
  private myRef = React.createRef<BoardView>();
  constructor(props: Properties) {
    super(props);
    this.state = {
      board: this.props.initialBoard.clone(),
      displayMode: DisplayMode.SMALL
    };
    this.onResize = this.onResize.bind(this);
    this.updateCell = this.updateCell.bind(this);
  }

  public render(): JSX.Element {
    const displayWidth = (() => {
      if(this.state.displayMode === DisplayMode.SMALL) {
        return '320px';
      } else {
        return undefined;
      }
    })();
    return (
      <VBoxLayout width={displayWidth}>
          <BoardView ref={this.myRef}
            board={this.state.board}
            hasEffects={true}
            displayMode={this.state.displayMode} />
          <Padding size='17px' />
          <NumberBar onValueSelected={this.updateCell}
            displayMode = {this.state.displayMode}/>
      </VBoxLayout>
    );
  }

  public componentWillMount() {
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  private onResize() {
    if(document.body.clientWidth >= 446) {
      if(this.state.displayMode !== DisplayMode.LARGE) {
        this.setState({ displayMode: DisplayMode.LARGE });
      }
    } else {
      if(this.state.displayMode !== DisplayMode.SMALL) {
        this.setState({ displayMode: DisplayMode.SMALL });
      }
    }
  }

  private updateCell(value: number) {
    const node = this.myRef.current;
    if(node) {
      const cell = node.getCurrentCell();
      if(cell && this.props.initialBoard.get(cell[0], cell[1]) === 0) {
        this.state.board.set(cell[0], cell[1], value);
        this.myRef.current.forceUpdate();
      }
    }
  }
}

export module GameController {
  export const Mode = DisplayMode;
}
