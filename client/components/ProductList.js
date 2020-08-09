import React from 'react'
import ProductCard from './ProductCard'

const ProductList = props => {
  const {products, fromPortal} = props
  return (
    <ul className="row-wrap">
      {products.length ? (
        products.map(product => (
          <li key={product.id}>
            <ProductCard {...product} fromPortal={fromPortal} />
          </li>
        ))
      ) : (
        <h3>No products to display</h3>
      )}
    </ul>
  )
}

export default ProductList
