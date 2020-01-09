import React from 'react';
import button from "eslint-plugin-jsx-a11y/src/util/implicitRoles/button";
import classes from './Button.css'

const Button = (props) => (
    <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}

    >{props.children}</button>
);

export default Button;