import React from 'react'
import ProductCard from './ProductCard'

const ProductList = props => {
  const {products} = props
  return (
    <ul className="row-wrap">
      {!products.lengt ? (
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
