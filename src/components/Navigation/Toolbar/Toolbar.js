import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigetionItems/NavigationItems";
import DrawerToggle from "../../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DisktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;