import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component
{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    };


    render()
    {
        return(
            <div>
                <h1>Enter your data !</h1>
                <form action="">
                    <input type="text" name="name" placeholder="Enter Your Name"/>
                    <input type="email" name="email" placeholder="Enter Your Mail"/>
                    <input type="text" name="street" placeholder="Enter Your Street"/>
                    <input type="text" name="cp" placeholder="Enter Your Code Postal"/>
                    <Button btnType="Success">Go</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;