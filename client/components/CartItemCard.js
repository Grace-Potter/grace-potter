import React from 'react'
import {Link} from 'react-router-dom'

const CartItemCard = props => {
  const {name, imageUrl, id, price} = props
  return (
    <div>
      <img src={imageUrl} />
      <Link to={`/products/${id}`}>{name}</Link>
      <button onClick={() => props.handleDelete()}>Delete</button>
      <>
        <label htmlFor="qty">Qty:</label>
        <select name="qty" id={id} onChange={props.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </>
      <>Placeholder Price: ${price}</>
    </div>
  )
}

export default CartItemCard
