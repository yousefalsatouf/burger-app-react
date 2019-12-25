import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigetionItems/NavigationItems";
import NavigationItem from "../NavigetionItems/NavigationItem/NavigationItem";

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;