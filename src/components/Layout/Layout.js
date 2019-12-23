import React from 'react';
import classes from './Layout.css'; //this guy here helps me to get classes from the css file
import Aux from "../../hoc/Auxiliary";

const Layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={ classes.content }>
            { props.children }
        </main>
    </Aux>
);


export default Layout;