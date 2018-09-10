import * as React from 'react';
import * as Router from 'react-router-dom';
import {StandingsModel} from '.';
import { Padding, HBoxLayout, VBoxLayout } from '../../layouts';
import {StyleSheet, css} from 'aphrodite';

interface Properties {

  /** The standings model to display. */
  model: StandingsModel;

  /** The URL to redirect to when leaving the page. */
  exitUrl: string;
};

enum Breakpoint {

  /** Page is between 0 and 559 pixels (inclusive). */
  SMALL,

  /** Page is between 560 and 1039 pixels (inclusive). */
  MEDIUM,

  /** Page is equal or greater than 1040 pixels. */
  LARGE
};

interface State {
  isLoading: boolean;
  redirect: string;
  breakpoint: Breakpoint;
};

export class StandingsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoading: true,
      redirect: null,
      breakpoint: Breakpoint.LARGE
    };
    this.onResize = this.onResize.bind(this);
  }

  public componentWillMount(): void { //is this correct???
    this.props.model.load().then(
      () => {
        this.setState({
          isLoading: false,
          breakpoint: Breakpoint.LARGE
        });
      });
      window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    } else if(this.state.isLoading) {
      return <div/>;
    }
    const topPadding = (() => {
      switch(this.state.breakpoint){
        case Breakpoint.SMALL: 
          return undefined;
        case Breakpoint.MEDIUM:
          return '150px';
        case Breakpoint.LARGE:
          return '220px';
      }
    })();
    const containerStyle = (() => {
      if(this.state.breakpoint === Breakpoint.SMALL){
        return undefined;
      } else{
        return StandingsPage.MODAL_CONTAINTER_STYLE;
      }
    })();
    return (
    <HBoxLayout height='100%' width='100%'>
      <Padding/> 
      <VBoxLayout>
         <Padding size={topPadding}/>
        <div style={containerStyle}>
        <div style={StandingsPage.RANKING_HEADER_STYLE}>Standings Page</div>
         <div style={StandingsPage.RANKING_ENTRY_STYLE}>Standings Page</div>
        <Padding/>
        <button className={css(StandingsPage.GOT_IT_BUTTON_STYLE.button)}>
            GOT IT
          </button>
        </div>
      </VBoxLayout>
      <Padding/>
    </HBoxLayout>);
  }

  private onResize() {
    if(document.body.clientWidth >= 1040) {
      if(this.state.breakpoint !== Breakpoint.LARGE) {
        this.setState({breakpoint: Breakpoint.LARGE});
      }
    } else if(document.body.clientWidth >= 560) {
      if(this.state.breakpoint !== Breakpoint.MEDIUM){
        this.setState({breakpoint: Breakpoint.MEDIUM});
      }
    } else {
      if(this.state.breakpoint !== Breakpoint.SMALL) {
        this.setState({breakpoint: Breakpoint.SMALL});
      }
    }
  }

  private static readonly MODAL_CONTAINTER_STYLE = {
    height: '458px',
    width: '294px',
    boxSizing: 'border-box' as 'border-box',
    border: '0px solid #FFFFFF',
    borderRadius: '4px',
    boxShadow: '0px 0px 5px #000000'
     
  };
  private static readonly RANKING_ENTRY_STYLE = {
    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#000000',
    textAlign: 'left' as 'left',
    ':hover': {
      background: '#E2E0FF'
    }
  };
  private static readonly RANKING_HEADER_STYLE = {
    fontFamily: 'Roboto',
    fontSize: '16px',
    color: '#2B23A0',
    textAlign: 'left' as 'left',
  };
  private static readonly GOT_IT_BUTTON_STYLE = StyleSheet.create({
    button: {
      height: '34px',
      width: '200px',
      boxSizing: 'border-box' as 'border-box',
      border: '1px solid #4B23A0',
      borderRadius: '4px',
      fontFamily: 'Roboto',
      fontSize: '16px',
      textAlign: 'center' as 'center',
      color: '#4b23A0',
      background: '#FFFFFF',
      ':focus' : {
        background: '#F2F2FF',
        color: '#4B23A0'
      },
      ':hover': {
        background: '#4B23A0',
        color: '#FFFFFF'
      },
      ':active':{
        background: '#4B23A0',
        color: '#F2F2FF'
      }
    }
  });
}


