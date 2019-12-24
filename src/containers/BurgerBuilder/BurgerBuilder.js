import React, { Component } from 'react';
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICE = [
    {
        salad: 0.4,
        bacon: 0.4,
        cheese: 0.7,
        meat: 1.5
    }
];

class BurgerBuilder extends Component
{
    /*
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }*/

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
    };

    addIngredientHandler = (type) => {
          const oldIngredientCount = this.state.ingredients[type];
          const newIngredientCount = oldIngredientCount + 1;
          const updateIngredients = {
              ...this.state.ingredients
          };

          updateIngredients[type] = newIngredientCount;

          const oldPrice = this.state.totalPrice[type];
          const additionPrice = INGREDIENTS_PRICE[type];
          const newPrice = oldPrice + additionPrice;

          this.setState({ingredients: updateIngredients, totalPrice: newPrice})

    };

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0)
        {
            return;
        }
        const newIngredientCount = oldIngredientCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = newIngredientCount;

        const oldPrice = this.state.totalPrice[type];
        const deductionPrice = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice - deductionPrice;

        this.setState({ingredients: updateIngredients, totalPrice: newPrice});
    };

    render()
    {
        const disableIngredients = {
            ...this.state.ingredients
        };

        for (let key in disableIngredients)
        {
            disableIngredients[key] = disableIngredients[key] <= 0;
        }

        return (
            <Aux>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disableIngredients}
                />
            </Aux>
        );
    }
}


export default BurgerBuilder;