import React from 'react'
import {Link} from 'react-router-dom'

const CartItemCard = props => {
  const {name, imageUrl, id} = props
  return (
    <div>
      <img src={imageUrl} />
      <Link to={`/products/${id}`}>{name}</Link>
    </div>
  )
}

export default CartItemCard
