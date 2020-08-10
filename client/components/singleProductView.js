import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {thunkAddCartItem} from '../store/cart'
import {Media, CardImg, CardTitle} from 'reactstrap'

class singleProductView extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.fetchProduct(id)
  }
  handleAddToCart(productId) {
    // console.log('addToCart button works')
    // console.log('user id: ', this.props.user.id)
    // console.log('product id: ', productId)
    // this.props.thunkAddCartItem(this.props.user.id, productId)
  }
  render() {
    const product = this.props.state
    // return (
    //   <div>
    //     <img src={product.imageUrl} />
    //     <h2>{product.name}</h2>
    //     <div>Description: {product.description}</div>
    //     <div>Price: {`$${product.price}`}</div>
    //     <div>Qty: {product.quantity}</div>
    //     <button
    //       type="button"
    //       onClick={() => this.handleAddToCart(product.id)}
    //     >
    //       Add to cart
    //     </button>
    //   </div>
    // )

    return (
      <div>
        <Media>
          <Media left={true}>
            <CardImg width="30%" src={product.imageUrl} />
          </Media>
          <Media body={true}>
            <CardTitle>{product.name}</CardTitle>
          </Media>
        </Media>
      </div>
    )
  }
}

const mapStateToProps = (reducerState) => ({
  state: reducerState.singleProduct.testState,
  user: reducerState.user,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
  thunkAddCartItem: (userId, productId) =>
    dispatch(thunkAddCartItem(userId, productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(singleProductView)
