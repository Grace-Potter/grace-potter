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
    if (Number.isInteger(userId)) {
      let {data} = await axios.get(`/api/carts/${userId}/currentCart/`)
      dispatch(getCart(data))
    } else {
      let {data} = await axios.get(`/api/carts/guestCart/${userId}/currentCart`)
      dispatch(getCart(data))
    }

    // let {data} = await axios.get(`/api/carts/${userId}/currentCart/`)
    // dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const thunkAddCartItem = (userId, productId) => async dispatch => {
  try {
    if (Number.isInteger(userId)) {
      await axios.post(`/api/carts/${userId}/currentCart/product/${productId}`)
    } else {
      await axios.post(
        `/api/carts/guestCart/${userId}/currentCart/product/${productId}`
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const thunkDeleteCartItem = (userId, productId) => async dispatch => {
  try {
    if (Number.isInteger(userId)) {
      await axios.delete(
        `/api/carts/${userId}/currentCart/product/${productId}`
      )
    } else {
      await axios.delete(
        `/api/carts/guestCart/${userId}/currentCart/product/${productId}`
      )
    }
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
    if (Number.isInteger(userId)) {
      await axios.put(
        `/api/carts/${userId}/currentCart/product/${productId}/quantity/${quantity}`
      )
    } else {
      await axios.put(
        `/api/carts/guestCart/${userId}/currentCart/product/${productId}/quantity/${quantity}`
      )
    }
    dispatch(fetchCart(userId))
  } catch (error) {
    console.log(error)
  }
}

export const thunkCheckoutCart = (
  userId,
  userEmail,
  orderId
) => async dispatch => {
  try {
    if (Number.isInteger(userId)) {
      let {data} = await axios.get(`/api/carts/${userId}/currentCart/checkout`)
      if (!data[0]) {
        await Promise.all([
          axios.post(`/api/nodemailer/${userEmail}/${orderId}`),
          axios.put(`/api/carts/${userId}/currentCart/checkout`)
        ])
      } else {
        console.log('list of out of stock items', data[0])
      }
    } else {
      let {data} = await axios.get(
        `/api/carts/guestCart/${userId}/currentCart/checkout`
      )
      if (!data[0]) {
        await axios.put(`/api/carts/guestCart/${userId}/currentCart/checkout`)
      } else {
        console.log('list of out of stock items', data[0])
      }
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
