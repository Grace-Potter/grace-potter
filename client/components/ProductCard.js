import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {name, imageUrl} = props
  return (
    <div>
      <img src={imageUrl} />
      <Link to="/temp">{name}</Link>
    </div>
  )
}

export default ProductCard
