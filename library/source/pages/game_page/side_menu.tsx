import * as React from 'react';

/** Lists the side menu items. */
enum SideMenuItem {

  /** Create a new game. */
  NEW_GAME,

  /** Display the standings page. */
  STANDINGS,

  /** Display the about page. */
  ABOUT,

  /** Exit the game. */
  EXIT
};

interface Properties {

  /** The on-click handler. */
  onClick: (item: SideMenu.Item) => void;
};

interface State {
  isMenuOpen: boolean;
};

/** Displays the game page's side menu. */
export class SideMenu extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
  }

  public render(): JSX.Element {
    return <div></div>;
  }
}

export module SideMenu {
  export const Item = SideMenuItem;
}
