import React from 'react'
import CartItemCard from './CartItemCard'
import {Button, Col} from 'reactstrap'

const CartList = props => {
  const {cart} = props
  return (
    <ul>
      {cart.length ? (
        <li>
          <Button color="primary" onClick={() => props.handleCheckout()}>
            Checkout
          </Button>
          <Col>
            {cart.map(product => (
              <li key={product.id}>
                <CartItemCard
                  {...product}
                  handleDelete={props.handleDelete}
                  handleChange={props.handleChange}
                />
              </li>
            ))}
          </Col>
        </li>
      ) : (
        <h3>No items in cart</h3>
      )}
    </ul>
  )
}

export default CartList
