import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Card,
  CardBody,
  CardTitle,
  Row
} from 'reactstrap'

const ProductForm = props => {
  const {
    name,
    description,
    price,
    quantity,
    imageUrl,
    handleChange,
    handleSubmit
  } = props

  return (
    <div className="pageView">
      <Form
        className="singleProduct shadow p-3 mb-5 bg-white rounded"
        onSubmit={handleSubmit}
      >
        <Row className="center">
          <FormGroup className="indent">
            <Label htmlFor="name">Display Name</Label>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              min="0"
              value={price}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              name="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              name="imageUrl"
              type="url"
              value={imageUrl}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>

        <Row>
          <FormGroup className="indent">
            <Label htmlFor="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>

        <Row>
          <FormGroup className="indent">
            <Button type="submit">Add Product</Button>
          </FormGroup>
        </Row>
      </Form>
    </div>
  )
}

export default ProductForm
