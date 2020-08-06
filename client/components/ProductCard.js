import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteproduct} from '../store/allProducts'

const ProductCard = props => {
  const {name, imageUrl, id, fromPortal, removeProduct} = props
  return (
    <div className="card">
      <img src={imageUrl} />
      <Link to={`/products/${id}`}>{name}</Link>
      <div>
        {fromPortal && (
          <Link to={`/admin/manageproducts/${id}`}>
            <button type="button">edit</button>
          </Link>
        )}
        {fromPortal && (
          <button type="button" onClick={() => removeProduct(id)}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  removeProduct: id => dispatch(deleteproduct(id))
})

export default connect(null, mapDispatch)(ProductCard)
