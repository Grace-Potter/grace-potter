import React from 'react'
import {connect} from 'react-redux'
import {ProductList, Pagination, Dropdown} from './index'
import {fetchProducts, fetchCategories} from '../store/index'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      itemsPerPage: 12,
      category: 'All Products',
      filter: -1
    }
    this.paginate = this.paginate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCategories()
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }

  handleChange(event) {
    this.setState({
      category: event.target.name,
      filter: parseInt(event.target.value, 10)
    })
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.itemsPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage
    // console.log('HEY', this.props.products[0])
    const products = this.props.products
      .filter(item => {
        if (this.state.filter === -1) return true
        return item.categoryId === this.state.filter
      })
      .slice(indexOfFirstPost, indexOfLastPost)

    return (
      <div className="background">
        <header>
          <h3>{this.state.category}</h3>

          <Dropdown
            handleChange={this.handleChange}
            items={this.props.categories}
            title="Categories"
          />

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

const mapState = state => ({
  products: state.allProducts,
  categories: state.categories
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(AllProducts)
