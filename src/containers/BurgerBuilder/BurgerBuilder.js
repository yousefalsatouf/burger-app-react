import React, { Component } from 'react';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import axios from '../../axios';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
        salad: 0.4,
        bacon: 0.4,
        cheese: 0.7,
        meat: 1.5
};

class BurgerBuilder extends Component
{
    state = {
        ingredients: null,
        totalPrice: 0,
        orderDisable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount()
    {
        axios.get('https://my-react-burger-486c2.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            });
    }

    orderDisable = (ingredients) =>
    {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
               return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({orderDisable: sum > 0})
    };

    addIngredientHandler = (type) => {
          const oldIngredientCount = this.state.ingredients[type];
          const newIngredientCount = oldIngredientCount + 1;
          const updateIngredients = {
              ...this.state.ingredients
          };

          updateIngredients[type] = newIngredientCount;

          const oldPrice = this.state.totalPrice;
          const additionPrice = INGREDIENTS_PRICE[type];
          const newPrice = oldPrice + additionPrice;

          this.setState({ingredients: updateIngredients, totalPrice: newPrice});

          this.orderDisable(updateIngredients);

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

        const oldPrice = this.state.totalPrice;
        const deductionPrice = INGREDIENTS_PRICE[type];
        const newPrice = parseInt(oldPrice) - parseInt(deductionPrice);

        this.setState({ingredients: updateIngredients, totalPrice: newPrice});

        this.orderDisable(updateIngredients);
    };

    purchaseHandler = () =>{
        this.setState({purchasing: true})
    };

    purchasingCancelHandler = () =>{
      this.setState({purchasing: false})
    };

    purchaseContinueHandler = () =>
    {
        const queryParams = [];
        for (let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });

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

        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.ingredients)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disableIngredients}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        orderDisable={this.state.orderDisable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchasingCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
            />;
        }

        if (this.state.loading)
        {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


export default errorHandler(BurgerBuilder, axios);