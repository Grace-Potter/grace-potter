import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const removeProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  } catch (err) {
    console.error(err)
  }
}

export const deleteproduct = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(removeProduct(productId))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = product => async dispatch => {
  try {
    const {data: newProduct} = await axios.post('/api/products', product)
    dispatch(addProduct(newProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products

    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)

    case ADD_PRODUCT:
      return [...state, action.product]

    default:
      return state
  }
}
