import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
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
    await axios.delete(`/api/carts/${userId}/currentCart/product/${productId}`)
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
    await axios.put(
      `/api/carts/${userId}/currentCart/product/${productId}/quantity/${quantity}`
    )
    dispatch(fetchCart(userId))
  } catch (error) {
    console.log(error)
  }
}

export const thunkCheckoutCart = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/carts/${userId}/currentCart/checkout`)
    if (!data[0]) {
      await axios.put(`/api/carts/${userId}/currentCart/checkout`)
    } else {
      console.log('list of out of stock items', data[0])
    }
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
