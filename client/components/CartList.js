import React from 'react'
import CartItemCard from './CartItemCard'
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

const CartList = props => {
  const {cart} = props
  return (
    // <ul>
    //   {cart.length ? (
    //     <li>
    //       <button type="button" onClick={() => props.handleCheckout()}>
    //         Checkout
    //       </button>
    //       {cart.map((product) => (
    //         <li key={product.id}>
    //           <CartItemCard
    //             {...product}
    //             handleDelete={props.handleDelete}
    //             handleChange={props.handleChange}
    //           />
    //         </li>
    //       ))}
    //     </li>
    //   ) : (
    //     <h3>No items in cart</h3>
    //   )}
    // </ul>

    <ul>
      {cart.length ? (
        <li>
          <Button color="primary" onClick={() => props.handleCheckout()}>
            Checkout
          </Button>
          <Col>
            {cart.map(product => (
              <li key={product.id}>
                <CartItemCard
                  {...product}
                  handleDelete={props.handleDelete}
                  handleChange={props.handleChange}
                />
              </li>
            ))}
          </Col>
        </li>
      ) : (
        <h3>No items in cart</h3>
      )}
    </ul>

    // <Col className="col-3">
    //   <Card className="text-center, checkoutProduct">
    //     <Row>
    //       <Col className="col-6">
    //         <CardImg top src={cart.product.imageUrl} alt="Card image cap" />
    //       </Col>
    //       <Col>
    //         <CardBody>
    //           <CardTitle>
    //             <h2>{cart.product.name}</h2>
    //           </CardTitle>
    //           <CardText>{`${cart.product.description}`}</CardText>
    //           <CardText>{`$${cart.product.price / 100}`}</CardText>

    //           <Button
    //             color="primary"
    //             onClick={() => this.handleAddToCart(product.id)}
    //           >
    //             Add to cart
    //           </Button>
    //         </CardBody>
    //       </Col>
    //     </Row>
    //   </Card>
    //   <Col className="col-3"></Col>
    // </Col>
  )
}

export default CartList
