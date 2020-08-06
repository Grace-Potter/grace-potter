import React from 'react'
import CartItemCard from './CartItemCard'

const CartList = props => {
  const {cart} = props
  return (
    <ul>
      {cart.length ? (
        <li>
          {cart.map(product => (
            <li key={product.id}>
              <CartItemCard {...product} />
            </li>
          ))}
          <li>
            <button>Checkout</button>
            <button>Delete all items from cart</button>
          </li>
        </li>
      ) : (
        <h3>No items in cart</h3>
      )}
    </ul>
  )
}

export default CartList
