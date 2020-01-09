import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios';
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component
{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your code postal'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: '',
                valid: true
            },
        },
        formIsValid: false,
        loading: false,
    };
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );

        const formData = {};
        for (let formEle in this.state.orderForm)
        {
            formData[formEle] = this.state.orderForm[formEle].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm: formData
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

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules)
        {
            return true;
        }

        if (rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };

        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        };

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm)
        {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid})

    };


    render()
    {
        const formElementsArr = [];
        for (let key in this.state.orderForm)
        {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            <form className={classes.ContactData} onSubmit={this.orderHandler}>
                <h1>Enter your data !</h1>
                {formElementsArr.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.state.loading)
        {
            form = <Spinner />;
        }
        return(
            <div>

                {form}
            </div>
        );
    }

}

export default ContactData;