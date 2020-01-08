import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios';
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";

class ContactData extends Component
{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'yosuef alsatouf',
                address: {
                    street: 'somestreetinsomswhere',
                    zipCode: '12345',
                    country: "belgium"
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            },
            deliveryMethod: 'fastest'
        };

        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    };


    render()
    {
        let form = (
            <form className={classes.ContactData}>
                <input className={classes.Input} type="text" name="name" placeholder="Enter Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Enter Your Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Enter Your Street"/>
                <input className={classes.Input} type="text" name="cp" placeholder="Enter Your Code Postal"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading)
        {
            form = <Spinner />;
        }
        return(
            <div>
                <h1>Enter your data !</h1>
                {form}
            </div>
        );
    }

}

export default ContactData;