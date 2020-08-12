import React from 'react'
import {connect} from 'react-redux'
import ProductList from './ProductList'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'
import {Button, Row} from 'reactstrap'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="pageView">
        <header>
          <h3>All Products</h3>
          {this.props.fromPortal && (
            <Row>
              <Link to="/admin-portal/manageproducts/addproduct">
                <Button type="button" className="indent">
                  Add Product
                </Button>
              </Link>
            </Row>
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
