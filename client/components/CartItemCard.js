import React from 'react'
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

const CartItemCard = props => {
  const {name, imageUrl, id, price, orderItem} = props
  return (
    <Card className="text-center checkoutProduct shadow p-3 mb-5 bg-white rounded">
      <Row>
        <Col className="col-6">
          <CardImg top src={imageUrl} alt="Card image cap" />
        </Col>
        <Col>
          <CardBody>
            <CardTitle>
              <h2>{name}</h2>
            </CardTitle>
            <CardText>{`$${price / 100}`}</CardText>
            <Row>
              <Col>
                <label htmlFor="qty">Qty:</label>
                <select name="qty" id={id} onChange={props.handleChange}>
                  <option value={orderItem.quantity} selected disabled hidden>
                    {orderItem.quantity}
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </Col>
              <Col>
                <Button color="danger" onClick={() => props.handleDelete(id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Col>
      </Row>
    </Card>
  )
}

export default CartItemCard
