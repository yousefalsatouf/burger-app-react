import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="here is a burger logo !"/>
    </div>
);

export default Logo;