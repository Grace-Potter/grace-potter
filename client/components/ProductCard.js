import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {name, imageUrl, id} = props
  return (
    <div>
      <div>
        <img src={imageUrl} />
      </div>
      <Link to={`/products/${id}`}>{name}</Link>
    </div>
  )
}

export default ProductCard
