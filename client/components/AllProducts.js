import React from 'react'
import {connect} from 'react-redux'
import {Dropdown, FilteredProducts} from './index'
import {fetchProducts, fetchCategories} from '../store/index'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      category: 'All Products',
      filter: -1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCategories()
  }

  handleChange(event) {
    this.setState({
      category: event.target.name,
      filter: parseInt(event.target.value, 10)
    })
  }

  render() {
    const products = this.props.products.filter(item => {
      if (this.state.filter === -1) return true
      return item.categoryId === this.state.filter
    })

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
        <FilteredProducts
          products={products}
          fromPortal={this.props.fromPortal}
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
