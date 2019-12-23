import React from 'react';
import classes from './Burger.css'
import Aux from "../../hoc/Auxiliary";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = () =>
{
    return(
        <Aux>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                <BurgerIngredient type="salad" />
                <BurgerIngredient type="cheese" />
                <BurgerIngredient type="meat" />
                <BurgerIngredient type="bread-bottom" />

            </div>
        </Aux>
    );
};

export default Burger;