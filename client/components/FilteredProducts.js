import React, {useState, useEffect} from 'react'
import {ProductList, Pagination} from './index'

const FilteredProducts = props => {
  const {fromPortal} = props

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage

  const products = props.products.slice(indexOfFirstPost, indexOfLastPost)

  // reset to first page whenever a new products list is sent
  // i.e. when switching categories
  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [props.products])

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <main>
      <ProductList products={products} fromPortal={fromPortal} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={props.products.length}
        paginate={paginate}
      />
    </main>
  )
}

export default FilteredProducts
