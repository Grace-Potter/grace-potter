import React from 'react'
import {Link} from 'react-router-dom'

const CartItemCard = props => {
  const {name, imageUrl, id} = props
  return (
    <div>
      <img src={imageUrl} />
      <Link to={`/products/${id}`}>{name}</Link>
      <button>Delete</button>
      <select name="qty" id="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  )
}

export default CartItemCard
