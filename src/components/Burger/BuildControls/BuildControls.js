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
        {controls.map(ctrl => {
         return <BuildControl
                  key={ctrl.label}
                  label={ctrl.label}
                  added={()=>props.addIngredient(ctrl.type)}
                  removed={()=>props.removeIngredient(ctrl.type)}
                  disabled={props.disabled[ctrl.type]}
         />
        })}
      </div>
  );
};

export default BuildControls;