import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import useStyles from './styles';
import AddressForm from '../AddressFrom';
import PaymentForm from '../PaymentFrom';

import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    useEffect(() => {
        const generateToken = (async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);
            } catch (err) {
                console.log(err)
            }
        })();
    }, [cart]);

    return (
        <>
            <div className={classes.toolbar} /> 
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => {
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
