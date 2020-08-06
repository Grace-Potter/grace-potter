import React from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'

class checkoutPage extends React.Component {
  componentDidMount() {}

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

// const mapDispatch = dispatch => ({
//   getProducts: () => dispatch(fetchProducts())
// })

export default connect(mapState)(checkoutPage)
