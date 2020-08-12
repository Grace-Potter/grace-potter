import React from 'react'
import {connect} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import CartList from './CartList'
import {
  fetchCart,
  thunkDeleteCartItem,
  thunkUpdateCartItem,
  thunkCheckoutCart
} from '../store/cart'

//const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.props.fetchCart(this.props.user.id)
    }
  }
  handleCheckout() {
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
    console.log(this.props)
    this.props.thunkCheckoutCart(
      this.props.user.id,
      this.props.user.email,
      this.props.cart[0].id
    )
  }

  handleDelete(productId) {
    this.props.thunkDeleteCartItem(this.props.user.id, productId)
  }

  handleChange() {
    this.props.thunkUpdateCartItem(
      this.props.user.id,
      event.target.id,
      event.target.value
    )
  }

  render() {
    if (!this.props.cart[0]) {
      return <h1>Loading</h1>
    } else {
      return (
        <div className="pageView">
          <h3>Shopping Cart</h3>
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
    dispatch(thunkDeleteCartItem(userId, productId)),
  thunkUpdateCartItem: (userId, productId, quantity) =>
    dispatch(thunkUpdateCartItem(userId, productId, quantity)),
  thunkCheckoutCart: (userId, userEmail, orderId) =>
    dispatch(thunkCheckoutCart(userId, userEmail, orderId))
})

export default connect(mapState, mapDispatch)(checkoutPage)
