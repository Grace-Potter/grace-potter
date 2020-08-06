import React from 'react'
import {connect} from 'react-redux'
import ProductList from './ProductList'
import {fetchProducts} from '../store/allProducts'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <header>
          <h1>All Products</h1>
          {this.props.fromPortal && (
            <button type="button" onClick={() => console.log('Click!')}>
              Add Product
            </button>
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
