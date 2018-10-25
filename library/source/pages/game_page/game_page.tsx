import * as React from 'react';
import * as Router from 'react-router-dom';
import {
  BoardView, EditButton, EffectButton,
  GameModel, NumberBar, SideMenu, Timer
} from '../..';
import {Padding, VBoxLayout, HBoxLayout} from '../../layouts';

enum DisplayMode {

  /** Page is between 0 and 445 pixels (inclusive). */
  SMALL,

  /** Page is equal or greater than 446 pixels. */
  LARGE
}

interface Properties {

  /** The game model to use. */
  model: GameModel;

  /** The URL to exit the game. */
  exitUrl: string;

  /** The URL to see the standigs. */
  standingsUrl: string;
}

interface State {
  displayMode: DisplayMode;
  hasEffects: boolean;
  redirect: string;
}

/** Implements a component that displays a sudoku board. */
export class GamePage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      displayMode: DisplayMode.SMALL,
      hasEffects: true,
      redirect: ''
    };
    this.onResize = this.onResize.bind(this);
    this.changeCellValue = this.changeCellValue.bind(this);
    this.toggleEffects = this.toggleEffects.bind(this);
    this.onSideMenuClick = this.onSideMenuClick.bind(this);
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    }
    const infoBars = (() => {
      if(this.state.displayMode === DisplayMode.LARGE) {
        return (
          <div>
            <div style={GamePage.NAME_AND_SETTINGS_BLOCK_STYLE}>
              <div style={GamePage.USER_NAME_STYLE}>
                {this.props.model.getUsername()}
              </div>
              <EffectButton style={GamePage.EFFECT_BUTTON_STYLE}
                isOn={this.state.hasEffects}
                onClick={this.toggleEffects}/>
              <EditButton/>
              <Timer style={GamePage.TIMER_STYLE}
                startTime = {this.props.model.getStartTime()}/>
            </div>
          </div>);
      } else {
        return (
          <div>
            <div style={GamePage.TIMER_BLOCK_STYLE}>
              <Timer style={GamePage.TIMER_STYLE}
                startTime = {this.props.model.getStartTime()}/>
            </div>
            <div style={GamePage.NAME_AND_SETTINGS_BLOCK_STYLE}>
              <div style={GamePage.USER_NAME_STYLE}>
                {this.props.model.getUsername()}
              </div>
              <EffectButton style={GamePage.EFFECT_BUTTON_STYLE}
                isOn={this.state.hasEffects}
                onClick={this.toggleEffects}/>
              <EditButton/>
            </div>
          </div>);
      }
    })();
    return (
      <HBoxLayout height='100%' width='100%'>
      <Padding/>
        <VBoxLayout>
          <Padding size='20px'/>
          <SideMenu onClick={this.onSideMenuClick}/>
          <Padding size='20px'/>
          {infoBars}
          <Padding size='40px'/>
          <BoardView ref={this.myRef}
            currentBoard={this.props.model.getCurrentBoard()}
            initialBoard={this.props.model.getInitialBoard()}
            hasEffects={this.state.hasEffects}
            displayMode={this.state.displayMode}/>
          <Padding size='17px'/>
          <NumberBar onValueSelected={this.changeCellValue}
            displayMode={this.state.displayMode}/>
          <Padding size='40px'/>
        </VBoxLayout>
      <Padding/>
      </HBoxLayout>
      );
  }

  public componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  private onResize() {
    if(document.body.clientWidth >= 446) {
      if(this.state.displayMode !== DisplayMode.LARGE) {
        this.setState({displayMode: DisplayMode.LARGE});
      }
    } else {
      if(this.state.displayMode !== DisplayMode.SMALL) {
        this.setState({displayMode: DisplayMode.SMALL});
      }
    }
  }

  private changeCellValue(value: number) {
    const node = this.myRef.current;
    if(node) {
      const cell = node.getSelectedCell();
      if(cell &&
          this.props.model.getInitialBoard().get(cell[0], cell[1]) === 0) {
        if(this.props.model.getCurrentBoard().get(cell[0], cell[1]) === value) {
          this.props.model.getCurrentBoard().set(cell[0], cell[1], 0);
          this.myRef.current.forceUpdate();
        } else {
          this.props.model.getCurrentBoard().set(cell[0], cell[1], value);
          this.myRef.current.forceUpdate();
        }
      }
    }
  }

  private toggleEffects() {
    this.setState({hasEffects: !this.state.hasEffects});
  }

  private onSideMenuClick(item: any) {
    switch(item) {
      case SideMenu.Item.EXIT:
        this.setState({redirect: this.props.exitUrl});
        break;
      case SideMenu.Item.STANDINGS:
        this.setState({redirect: this.props.standingsUrl});
        break;
    }
  }

  private static readonly PAGE_STYLE = {
    minHeight: '633px'
  };
  private static readonly USER_NAME_STYLE = {
    color: '#4B23A0',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'bold' as 'bold',
    marginRight: 'auto' as 'auto',
    cursor: 'default' as 'default'
  };
  private static readonly MIN_WIDTH_STYLE = {
    minWidth: '320px'
  };
  private static readonly TIMER_STYLE = {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '14px',
    marginLeft: '20px',
    cursor: 'default' as 'default'
  };
  private static readonly TIMER_BLOCK_STYLE = {
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    marginBottom: '20px'
  };
  private static readonly NAME_AND_SETTINGS_BLOCK_STYLE = {
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end'
  };
  private static readonly EFFECT_BUTTON_STYLE = {
    marginRight: '20px'
  };
  private myRef = React.createRef<BoardView>();
}

export module GamePage {
  export const Mode = DisplayMode;
}
