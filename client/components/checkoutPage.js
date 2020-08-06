import React from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {fetchCart} from '../store/cart'

class checkoutPage extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <CartList cart={this.props.cart} />
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
