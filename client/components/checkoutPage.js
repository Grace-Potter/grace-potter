import React from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {fetchCart} from '../store/cart'

class checkoutPage extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }

  handleCheckout() {
    console.log('checkout handler works')
    console.log('user id:', this.props.user.id)
  }

  handleDelete() {
    console.log('delete handler works')
    console.log('user id:', this.props.user.id)
  }

  handleChange(event) {
    console.log('qty: ', event.target.value)
    console.log('product id: ', event.target.id)
    console.log('user id:', this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <CartList
          cart={this.props.cart}
          handleCheckout={this.handleCheckout}
          handleDelete={this.handleDelete}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(checkoutPage)
