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
    this.onGotIt = this.onGotIt.bind(this);
  }

  public componentWillMount(): void { //is this correct???
    this.props.model.load().then(
      () => {
        this.setState({
          isLoading: false
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
    const rankingEntries = (() => {
      return ( <tr>
              <td>{this.props.model.getStandings()[0].rank}</td>
              <td>{this.props.model.getStandings()[0].name}</td>
              <td>{this.props.model.getStandings()[0].time}</td>
            </tr>);
    })(); 
    return (
    <HBoxLayout height='100%' width='100%'>
      <Padding/> 
      <VBoxLayout>
         <Padding size={topPadding}/>
         <div style={containerStyle}>
        <table>
          <thead>
            <tr style={StandingsPage.RANKING_HEADER_STYLE}>
              <th style={StandingsPage.RANK_TABLE_ELEMENT_STYLE.rank}>Rank</th>
              <th style={StandingsPage.RANK_TABLE_ELEMENT_STYLE.name}>Name</th>
              <th style={StandingsPage.RANK_TABLE_ELEMENT_STYLE.time}>Time</th>
            </tr>
          </thead>
          <tbody style={StandingsPage.RANKING_ENTRY_STYLE}>
            {rankingEntries}
          </tbody>
        </table>
        <div>
        <button 
              onClick={this.onGotIt}
              className={css(StandingsPage.GOT_IT_BUTTON_STYLE.button)}>
            GOT IT
          </button>
        </div>
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

  private onGotIt() {
    this.setState({redirect: this.props.exitUrl});
  }
  

  private static readonly MODAL_CONTAINTER_STYLE = {
    height: '458px',
    width: '294px',
    boxSizing: 'border-box' as 'border-box',
    border: '0px solid #FFFFFF',
    borderRadius: '4px',
    boxShadow: '0px 0px 5px #000000'
  };
  private static readonly RANK_TABLE_ELEMENT_STYLE = {
    rank: {
      paddingLeft: '17px',
      width: '60px'
    },
    name: {
      width: '140px'
    },
    time: {
      width: '50px',
      paddingRight: '17px'
    }  
  };
  private static readonly RANKING_HEADER_STYLE = {
    paddingTop: '40px',
    boxSizing: 'border-box' as 'border-box',
    textAlign: 'left' as 'left',
    fontFamily: 'Roboto',
    fontSize: '16px',
    color: '#2B23A0',
  };  
  private static readonly RANKING_ENTRY_STYLE = {
    boxSizing: 'border-box' as 'border-box',
    textAlign: 'left' as 'left',
    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#000000',
    ':hover': {
      background: '#E2E0FF'
    }
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
