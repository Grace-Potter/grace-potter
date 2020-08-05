import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({
  type: GET_PRODUCT,
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
    default:
      return state
  }
}
