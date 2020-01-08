import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import classes from './BuildControls.css';

const controls = [
  { label: 'salad', type: 'salad'},
  { label: 'meat', type: 'meat'},
  { label: 'cheese', type: 'cheese'},
  { label: 'bacon', type: 'bacon'},
];

const BuildControls = (props) =>
{
  return (
      <div className={classes.BuildControls}>
        <p className={classes.Price}>Current Price:  <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl => {
         return <BuildControl
                  key={ctrl.label}
                  label={ctrl.label}
                  added={()=>props.addIngredient(ctrl.type)}
                  removed={()=>props.removeIngredient(ctrl.type)}
                  disabled={props.disabled[ctrl.type]}
         />
        })}
        <button
            className={classes.OrderButton}
            disabled={!props.orderDisable}
            onClick={props.ordered}
        >Order Now!</button>
      </div>
  );
};

export default BuildControls;