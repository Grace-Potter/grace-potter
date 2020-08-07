import React from 'react'

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Display Name</label>
      <input name="name" type="text" value={name} onChange={handleChange} />

      <label htmlFor="price">Price</label>
      <input
        name="price"
        type="number"
        min="0"
        value={price}
        onChange={handleChange}
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        name="quantity"
        type="number"
        min="0"
        value={quantity}
        onChange={handleChange}
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        name="imageUrl"
        type="url"
        value={imageUrl}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={description}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm
