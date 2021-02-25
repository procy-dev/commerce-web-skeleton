import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart }) => {
    const classes = useStyles();
    
    const EmptyCart = () => <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>

    const FilledCart = () => (
        <>
            <Grid type="container" spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: { cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                        <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
            </div>
        </>
    )

    return (
        !cart.line_items ? <div>Loading Cart...</div> : (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem) => (
                <Grid item xs={12} sm={4} key={lineItem.id}>
                    <CartItem item={lineItem}  />
                </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" >Empty cart</Button>
                    <Button className={classes.checkoutButton} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    ))
}

export default Cart
