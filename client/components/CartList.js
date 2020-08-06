import React from 'react'
import CartItemCard from './CartItemCard'

const CartList = props => {
  const {cart} = props
  return (
    <ul>
      {cart.length ? (
        <li>
          <button onClick={() => props.handleCheckout()}>Checkout</button>
          {cart.map(product => (
            <li key={product.id}>
              <CartItemCard {...product} handleDelete={props.handleDelete} />
            </li>
          ))}
        </li>
      ) : (
        <h3>No items in cart</h3>
      )}
    </ul>
  )
}

export default CartList
