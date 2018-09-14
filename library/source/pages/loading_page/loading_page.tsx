import * as React from 'react';
import {HBoxLayout, Padding, VBoxLayout} from '../../layouts';

enum Breakpoint {

  /** Page is between 0 and 559 pixels (inclusive). */
  SMALL,

  /** Page is between 560 and 1039 pixels (inclusive). */
  MEDIUM,

  /** Page is equal or greater than 1040 pixels. */
  LARGE
}

interface State {
  breakpoint: Breakpoint;
}

/** Displays the loading page. Used to transition between pages where data
    needs to be loaded.
*/
export class LoadingPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      breakpoint: Breakpoint.LARGE
    };
    this.onResize = this.onResize.bind(this);
  }

  public componentWillMount(): void {
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }

  public render(): JSX.Element {
    const topPadding = (() => {
      switch(this.state.breakpoint) {
        case Breakpoint.SMALL: 
          return '100px';
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
          return '40px';
      }
    })();
    return (
      <HBoxLayout height='100%' width='100%'>
        <Padding/>
        <VBoxLayout>
          <Padding size={topPadding}/>
          <img src = 'resources/images/loading_page/animated-loader.gif'
              width='80px' height='40px'/>
           <Padding size='40px'/>
           <div style={LoadingPage.TEXT_STYLE}>Please wait...</div>
          <Padding size ={bottomPadding}/>
        </VBoxLayout>
        <Padding/>
      </HBoxLayout>
    );
  }
  
  private onResize(){
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

  private static readonly TEXT_STYLE = {
    color: '#333333',
    fontSize: '12px',
    fontFamily: 'Roboto',
    textAlign: 'center' as 'center'
  }
}
