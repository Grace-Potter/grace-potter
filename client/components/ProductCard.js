import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {name, imageUrl, id, fromPortal} = props
  return (
    <div className="card">
      <img src={imageUrl} />
      <Link to={`/products/${id}`}>{name}</Link>
      {fromPortal && (
        <Link to={`/admin/manageproducts/${id}`}>
          <button type="button">edit</button>
        </Link>
      )}
    </div>
  )
}

export default ProductCard
