import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {thunkAddCartItem} from '../store/cart'

/* 
    name: 'ME OK Mug',
    price: 55.0,
    quantity: 5,
    description: 'A wheel thrown and hand painted mug by Marian Bull',
    imageUrl: 'images/MeOk.jpg'
*/
class singleProductView extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.fetchProduct(id)
  }
  handleAddToCart() {
    console.log('addToCart button works')
  }
  render() {
    console.log('this.props.state', this.props.state)
    const product = this.props.state
    return (
      <div>
        <img src={product.imageUrl} />
        <h2>{product.name}</h2>
        <div>Description: {product.description}</div>
        <div>Price: {`$${product.price}`}</div>
        <div>Qty: {product.quantity}</div>
        <button onClick={() => this.handleAddToCart()}>Add to cart</button>
      </div>
    )
  }
}

const mapStateToProps = reducerState => ({
  state: reducerState.singleProduct.testState
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  thunkAddCartItem: (userId, productId) =>
    dispatch(thunkAddCartItem(userId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(singleProductView)
