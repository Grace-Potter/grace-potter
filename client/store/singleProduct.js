import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProduct = productId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(data))
  } catch (error) {
    console.log(error)
  }
}

export const putProduct = (product, productId) => async dispatch => {
  try {
    const {data: newProduct} = await axios.put(
      `/api/products/${productId}`,
      product
    )
    dispatch(updateProduct(newProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const initialState = {
  testState: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, testState: action.product}

    case UPDATE_PRODUCT:
      return {
        ...state,
        testState: action.product
      }

    default:
      return state
  }
}
