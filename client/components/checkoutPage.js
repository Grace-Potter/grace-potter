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
import {
  CardImg,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Button,
  Col,
  Row
} from 'reactstrap'

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
    // console.log('checkout handler works')
    // console.log('user id:', this.props.user.id)
    this.props.thunkCheckoutCart(this.props.user.id)
  }

  handleDelete(productId) {
    // console.log('delete handler works')
    // console.log('user id:', this.props.user.id)
    // console.log('product id: ', productId)
    this.props.thunkDeleteCartItem(this.props.user.id, productId)
  }

  handleChange() {
    // console.log('qty: ', event.target.value)
    // console.log('product id: ', event.target.id)
    // console.log('user id:', this.props.user.id)
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
        <div>
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
  thunkCheckoutCart: userId => dispatch(thunkCheckoutCart(userId))
})

export default connect(mapState, mapDispatch)(checkoutPage)
