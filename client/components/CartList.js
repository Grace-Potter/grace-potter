import React from 'react'
import CartItemCard from './CartItemCard'

const CartList = props => {
  const {cart} = props
  return (
    <ul>
      {cart.length ? (
        <li>
          {/* AM: I'm passing event into the OnClick*/}
          <button onClick={event => props.handleCheckout()}>Checkout</button>
          {cart.map(product => (
            <li key={product.id}>
              <CartItemCard
                {...product}
                handleDelete={props.handleDelete}
                handleChange={props.handleChange}
              />
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
