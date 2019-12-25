import React, {Component} from 'react';
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

//this guy has been turned to class to use lifecycle ...

class OrderSummary extends Component
{
    //to use lifecycle we need to use methods to know where does the app do the update ...
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        console.log('order summary did update');
    }

    render ()
    {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}</li>
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients!</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;