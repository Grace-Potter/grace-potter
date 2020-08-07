import React from 'react'
import {connect} from 'react-redux'
import {ProductForm} from './index'
import {fetchProduct, putProduct} from '../store/index'

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      initialized: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('mount')
    const id = this.props.match.params.productId
    this.props.getProduct(id)
  }

  componentDidUpdate() {
    if (!this.state.initialized) {
      const {name, description, price, quantity, imageUrl} = this.props.product

      this.setState({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        initialized: true
      })

      console.log('updated')
    }
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
    this.props.updateProduct(product, this.props.product.id)

    // redirect to all products view in admin portal
    this.props.history.push('/admin-portal/manageproducts')
  }

  render() {
    return (
      this.state.initialized && (
        <div>
          <h1>Create a new product listing</h1>
          <ProductForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            {...this.state}
          />
        </div>
      )
    )
  }
}

const mapState = state => ({
  product: state.singleProduct.testState
})

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(fetchProduct(productId)),
  updateProduct: (product, id) => dispatch(putProduct(product, id))
})

export default connect(mapState, mapDispatch)(UpdateProduct)
