import React from 'react'
import CartItemCard from './CartItemCard'

const CartList = props => {
  const {cart} = props
  return (
    <ul>
      {cart.length ? (
        cart.map(product => (
          <li key={product.id}>
            <CartItemCard {...product} />
          </li>
        ))
      ) : (
        <h3>No items in cart</h3>
      )}
    </ul>
  )
}

export default CartList
