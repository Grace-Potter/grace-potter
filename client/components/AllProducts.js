import React from 'react'
import {connect} from 'react-redux'
import {ProductList, Pagination} from './index'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      itemsPerPage: 2,
    }
    this.paginate = this.paginate.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    })
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.itemsPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage
    const products = this.props.products.slice(
      indexOfFirstPost,
      indexOfLastPost
    )

    return (
      <div>
        <header>
          <h1>All Products</h1>
          {this.props.fromPortal && (
            <Link to="/admin-portal/manageproducts/addproduct">
              <button type="button">Add Product</button>
            </Link>
          )}
        </header>
        <ProductList products={products} fromPortal={this.props.fromPortal} />
        <Pagination
          itemsPerPage={this.state.itemsPerPage}
          totalItems={this.props.products.length}
          paginate={this.paginate}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.allProducts,
})

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
})

export default connect(mapState, mapDispatch)(AllProducts)
