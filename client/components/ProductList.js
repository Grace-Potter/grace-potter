import React from 'react'
import ProductCard from './ProductCard'

const ProductList = props => {
  const {products} = props
  return (
    <ul>
      {!products.lengt ? (
        products.map(product => (
          <li key={product.id}>
            <ProductCard />
          </li>
        ))
      ) : (
        <h3>No products to display</h3>
      )}
    </ul>
  )
}

export default ProductList
