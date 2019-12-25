import React, {Component} from 'react';
import classes from './Layout.css'; //this guy here helps me to get classes from the css file
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

class Layout extends Component
{
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () =>
    {
        this.setState({showSideDrawer: false});
    };
    //for setting the state depending on the old state, it is clean using the previous state like ...
    sideDrawerToggleHandler = () =>
    {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

  render()
  {
      return (
          <Aux>
              <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
              <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
              <main className={ classes.content }>
                  { this.props.children }
              </main>
          </Aux>
      );
  }
}


export default Layout;