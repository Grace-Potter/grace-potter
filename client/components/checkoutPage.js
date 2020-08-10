import React from 'react'
import {connect} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import CartList from './CartList'
import {fetchCart, thunkDeleteCartItem} from '../store/cart'

//const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

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

  async handleCheckout(event) {
    // console.log('checkout handler works')
    // console.log('user id:', this.props.user.id)
    /*****************************
    ***** STRIPE INTEGRATION *****

    // Stripe: Call your backend to create the Checkout Session—see previous step
    // AM: Axios request??
    const { sessionId } = await createCheckoutSession();
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.

    ******************************/
  }

  handleDelete(id) {
    // console.log('delete handler works')
    // console.log('user id:', this.props.user.id)
    // console.log('product id: ', id)
  }

  handleChange(event) {
    // console.log('qty: ', event.target.value)
    // console.log('product id: ', event.target.id)
    // console.log('user id:', this.props.user.id)
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
  // thunkDeleteCartItem: () => dispatch(thunkDeleteCartItem())
})

export default connect(mapState, mapDispatch)(checkoutPage)
