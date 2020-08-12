import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {thunkAddCartItem} from '../store/cart'
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
    this.props.thunkAddCartItem(this.props.user.id, productId)
  }
  render() {
    const product = this.props.state

    return (
      <div className="pageView">
        <Card className="text-center singleProduct shadow p-3 mb-5 bg-white rounded">
          <Row>
            <Col className="col-6">
              <CardImg top src={product.imageUrl} alt="Card image cap" />
            </Col>
            <Col>
              <CardBody>
                <CardTitle>
                  <h2>{product.name}</h2>
                </CardTitle>
                <CardText>{`${product.description}`}</CardText>
                <CardText>{`$${product.price / 100}`}</CardText>

                <Button
                  color="primary"
                  onClick={() => this.handleAddToCart(product.id)}
                >
                  Add to cart
                </Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = reducerState => ({
  state: reducerState.singleProduct.testState,
  user: reducerState.user
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  thunkAddCartItem: (userId, productId) =>
    dispatch(thunkAddCartItem(userId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(singleProductView)
