import React from 'react';
import classes from './Burger.css'
import Aux from "../../hoc/Auxiliary";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) =>
{
    // to do map have to transfer object to array ...
    // again here in case, if i have for ex 2 meat or 2 cheese, i should have them by looping on them using map after transfer it from object to array
    let objIngredientsToArr = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + 1} type={ingKey} />
            })
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (objIngredientsToArr.length === 0)
    {
        objIngredientsToArr = <p>Please start adding ingredients</p>;
    }

    return(
        <Aux>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                { objIngredientsToArr }
                <BurgerIngredient type="bread-bottom" />

            </div>
        </Aux>
    );
};

export default Burger;