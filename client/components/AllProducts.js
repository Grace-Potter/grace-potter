import React from 'react'
import {connect} from 'react-redux'
import ProductList from './ProductList'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="background">
        <header>
          <h3>All Products</h3>
          {this.props.fromPortal && (
            <Link to="/admin-portal/manageproducts/addproduct">
              <button type="button">Add Product</button>
            </Link>
          )}
        </header>
        <ProductList
          products={this.props.products}
          fromPortal={this.props.fromPortal}
        />
      </div>
    )
  }
}

const mapState = state => ({
  products: state.allProducts
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
