import React from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {fetchCart} from '../store/cart'

class checkoutPage extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }

  handleCheckout() {
    console.log('checkout handler works')
  }

  handleDelete() {
    console.log('delete handler works')
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <CartList
          cart={this.props.cart}
          handleCheckout={this.handleCheckout}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(checkoutPage)
