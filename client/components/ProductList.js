import React from 'react'
import ProductCard from './ProductCard'

const ProductList = (props) => {
  const {products, fromPortal} = props
  return (
    <ul className="row-wrap row row-cols-4">
      {products.length ? (
        products.map((product) => (
          <li key={product.id} className="cardContainer col">
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
