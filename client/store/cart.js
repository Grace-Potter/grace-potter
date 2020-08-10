import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
})

const updateCartItem = updatedCart => ({
  type: UPDATE_CART_ITEM,
  updatedCart
})

/**
 * THUNK CREATORS
 */
export const fetchCart = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/carts/${userId}/currentCart/`)
    dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const thunkAddCartItem = (userId, productId) => async dispatch => {
  try {
    await axios.post(`/api/carts/${userId}/currentCart/product/${productId}`)
  } catch (error) {
    console.log(error)
  }
}

export const thunkDeleteCartItem = (userId, productId) => async dispatch => {
  try {
    let {data: deletedItem} = await axios.delete(
      `/api/carts/${userId}/currentCart/product/${productId}`
    )
    dispatch(fetchCart(userId))
  } catch (error) {
    console.log(error)
  }
}

export const thunkUpdateCartItem = (
  userId,
  productId,
  quantity
) => async dispatch => {
  try {
    let {data: updatedItem} = await axios.put(
      `/api/carts/${userId}/currentCart/product/${productId}/quantity/${quantity}`
    )
    dispatch(fetchCart(userId))
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
