import {StyleSheet, css} from 'aphrodite/no-important';
import * as React from 'react';
import * as Router from 'react-router-dom';
import {HBoxLayout, Padding, VBoxLayout} from '../../layouts';
import {StandingsModel} from '.';


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

  public componentWillMount(): void {
    this.props.model.load().then(
      () => {
        this.setState({
          isLoading: false
        });
      });
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }

  public render(): JSX.Element {
    if(this.state.redirect) {
      return <Router.Redirect push to={this.state.redirect}/>;
    } else if(this.state.isLoading) {
      return <div/>;
    }
    const topPadding = (() => {
      switch(this.state.breakpoint) {
        case Breakpoint.SMALL: 
          return undefined;
        case Breakpoint.MEDIUM:
          return '150px';
        case Breakpoint.LARGE:
          return '220px';
      }
    })();
    const bottomPadding = (() => {
      if(this.state.breakpoint === Breakpoint.SMALL) {
        return undefined;
      } else {
        return '50px';
      }
    })();
    const containerStyle = (() => {
      if(this.state.breakpoint === Breakpoint.SMALL) {
        return StandingsPage.MODAL_CONTAINTER_STYLE.default;
      } else {
        return StandingsPage.MODAL_CONTAINTER_STYLE.bordered;
      }
    })();
    const rankingEntries = (() => {
      const rows = [];
      const displayedEntries = Math.min(10, 
        this.props.model.getStandings().length);
      for(let i = 0; i < 10; ++i) {
        if(i < displayedEntries) {
          const standing = this.props.model.getStandings()[i];
          rows.push(
            <tr className={css(StandingsPage.RANKING_ENTRY_STYLE.tr)}>
              <td/>
              <td className={css(StandingsPage.RANKING_ENTRY_STYLE.rank)}>
                {standing.rank}
              </td>
              <td className={css(StandingsPage.RANKING_ENTRY_STYLE.name)}>
                {standing.name}
              </td>
              <td className={css(StandingsPage.RANKING_ENTRY_STYLE.time)}>
                {standing.time}
              </td>
              <td/>
            </tr>);
        } else {
          rows.push(
            <tr className={css(StandingsPage.RANKING_ENTRY_STYLE.tr)}>
              <td/>
              <td className={css(StandingsPage.RANKING_ENTRY_STYLE.rank)}>
                {i + 1}
              </td>
              <td className={css(StandingsPage.RANKING_ENTRY_STYLE.name)}>
                Bad Bot
              </td>
              <td>
                {String.fromCharCode(8734)}
              </td>
              <td/>
            </tr>);
        }
      }
      return rows;
    })(); 
    return (
      <HBoxLayout height='100%' width='100%' style={StandingsPage.SCROLL_STYLE}>
        <Padding/>
        <VBoxLayout>
          <Padding size={topPadding}/>
          <div style={containerStyle}>
            <table className={css(StandingsPage.RANK_TABLE_STYLE.table)}>
              <thead>
                <tr style={StandingsPage.RANK_TABLE_HEADER_STYLE.default}>
                  <th/>
                  <th style={StandingsPage.RANK_TABLE_HEADER_STYLE.rank}>
                    RANK
                  </th>
                  <th style={StandingsPage.RANK_TABLE_HEADER_STYLE.name}> 
                    NAME
                  </th>
                  <th style={StandingsPage.RANK_TABLE_HEADER_STYLE.time}>
                    TIME
                  </th>
                  <th/>
                </tr>
              </thead>
              <tbody>
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
          <Padding size={bottomPadding}/>
        </VBoxLayout>
        <Padding/>
      </HBoxLayout>
    );
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
  private static readonly SCROLL_STYLE = {
    overflowY: 'auto' as 'auto',
    overflowX: 'visible' as 'visible',
    display:' inline-block'
  }
  private static readonly MODAL_CONTAINTER_STYLE = {
    default: {
      width: '100%',
      marginTop: 'auto' as 'auto',
      marginBotton: 'auto' as 'auto',
      marginLeft: 'auto' as 'auto',
      marginRight: 'auto' as 'auto'
    },
    bordered: {
      height: '458px',
      width: '294px',
      border: '0px solid #FFFFFF',
      borderRadius: '4px',
      boxShadow: '0px 0px 5px #000000'
    }
  };
  private static readonly RANK_TABLE_STYLE = StyleSheet.create({
    table:{
      boxSizing: 'content-box' as 'content-box',
      marginTop: '40px',
      marginBottom: '40px',
      width: 'inherit',
      borderSpacing: '0',
      borderCollapse: 'collapse' as 'collapse',
      tableLayout: 'fixed' as 'fixed' 
    }
  });
  private static readonly RANK_TABLE_HEADER_STYLE = {
    default:{
      height: '24px',
      textAlign: 'left' as 'left',
      fontFamily: 'Roboto',
      fontSize: '12px',
      color: '#2B23A0',
      padding: '0',
      paddingBottom: '10px'
    },
    rank: {
      width: '60px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '17px',
      paddingRight: '0px'
    },
    name: {
      width: '140px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px'
    },
    time: {
      width: '60px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '17px'
    }
  };
  private static readonly RANKING_ENTRY_STYLE = StyleSheet.create({
    tr:{
      height: '28px',
      textAlign: 'left' as 'left',
      fontFamily: 'Roboto',
      fontSize: '14px',
      color: '#000000',
      padding: '0',
      ':hover': {
        background: '#E2E0FF'
      }
    },
    rank: {
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '17px',
      paddingRight: '0px'
    },
    name: {
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px'
    },
    time: {
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '17px'
    }  
  });
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
      display: 'block' as 'block',
      margin: '0 auto',
      marginBottom: '40px',
      ':focus': {
        background: '#F2F2FF',
        color: '#4B23A0',
        outline: '0'
      },
      '::-moz-focus-inner': {
        border: '0'
      },
      ':hover': {
        background: '#4B23A0',
        color: '#FFFFFF',
        transition: 'none',
        outline: '0' 
      },
      ':active': {
        background: '#4B23A0',
        color: '#F2F2FF'
      }
    }
  });
}
