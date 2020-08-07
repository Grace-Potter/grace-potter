import React from 'react'
import {connect} from 'react-redux'
import {ProductForm} from './index'
import {postProduct} from '../store/allProducts'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    // don't include optional fields that have been left blank
    const product = Object.keys(this.state)
      .filter(key => !!key)
      .reduce((obj, key) => {
        obj[key] = this.state[key]
        return obj
      }, {})

    // dispatch thunk
    this.props.addProduct(product)

    // redirect to all products view in admin portal
    this.props.history.push('/admin-portal/manageproducts')
  }

  render() {
    return (
      <div>
        <h1>Create a new product listing</h1>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          {...this.state}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addProduct: product => dispatch(postProduct(product))
})

export default connect(null, mapDispatch)(AddProduct)
