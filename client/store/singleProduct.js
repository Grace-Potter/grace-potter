/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = item => ({
  type: GET_PRODUCT
})

const initialState = {
  testState: ['state1']
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  return state
}
