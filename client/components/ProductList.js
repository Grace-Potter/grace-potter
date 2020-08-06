import React from 'react'
import ProductCard from './ProductCard'

const ProductList = props => {
  const {products} = props
  return (
    <ul>
      {!products.length ? (
        products.map(product => (
          <li key={product.id}>
            <ProductCard {...product} />
          </li>
        ))
      ) : (
        <h3>No products to display</h3>
      )}
    </ul>
  )
}

export default ProductList
