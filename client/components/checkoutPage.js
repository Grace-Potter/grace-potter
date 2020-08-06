import React from 'react'
import {connect} from 'react-redux'

class checkoutPage extends React.Component {
  componentDidMount() {}

  render() {
    console.log(this.props.cart)
    return (
      <div>
        <h1>Shopping Cart</h1>
        {/* <ProductList products={this.props.products} /> */}
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
