import React from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {fetchCart, thunkDeleteCartItem} from '../store/cart'

class checkoutPage extends React.Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }

  handleCheckout() {
    // console.log('checkout handler works')
    // console.log('user id:', this.props.user.id)
  }

  handleDelete(productId) {
    // console.log('delete handler works')
    // console.log('user id:', this.props.user.id)
    // console.log('product id: ', productId)
    this.props.thunkDeleteCartItem(this.props.user.id, productId)
  }

  handleChange(event) {
    // console.log('qty: ', event.target.value)
    // console.log('product id: ', event.target.id)
    // console.log('user id:', this.props.user.id)
  }

  render() {
    if (!this.props.cart[0]) {
      return <h1>Loading</h1>
    } else {
      return (
        <div>
          <h1>Shopping Cart</h1>
          <CartList
            cart={this.props.cart[0].products}
            handleCheckout={this.handleCheckout}
            handleDelete={this.handleDelete}
            handleChange={this.handleChange}
          />
        </div>
      )
    }
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  thunkDeleteCartItem: (userId, productId) =>
    dispatch(thunkDeleteCartItem(userId, productId))
})

export default connect(mapState, mapDispatch)(checkoutPage)
