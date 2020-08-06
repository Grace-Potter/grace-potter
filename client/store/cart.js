import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
})

const deleteCartItem = item => ({
  type: DELETE_CART_ITEM,
  item
})

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async dispatch => {
  try {
    let {data} = await axios.get(`/api/products`) // This route is a placeholder until the cart routes become available
    dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
