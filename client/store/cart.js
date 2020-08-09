import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addCartItem = newItem => ({
  type: ADD_CART_ITEM,
  newItem
})

const deleteCartItem = deletedItem => ({
  type: DELETE_CART_ITEM,
  deletedItem
})

const updateCartItem = updatedCart => ({
  type: UPDATE_CART_ITEM,
  updatedCart
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

export const thunkAddCartItem = (userId, productId) => async dispatch => {
  try {
    let {data: newItem} = await axios.post(
      `/${userId}/currentCart/${productId}`
    )
    dispatch(addCartItem(newItem))
  } catch (error) {
    console.log(error)
  }
}

export const thunkDeleteCartItem = userId => async dispatch => {
  try {
    let {data: deletedItem} = await axios.delete(`/api/${userId}/currentCart`) // This route is a placeholder until delete cart route becomes available
    dispatch(deleteCartItem(deletedItem))
  } catch (error) {
    console.log(error)
  }
}

// -------------- Does this work? ----------------------
// export const thunkDeleteCartItem = (userId) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/${userId}/currentCart`) // This route is a placeholder until delete cart route becomes available
//     fetchCart()
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const thunkUpdateCartItem = (userId, productId) => async (dispatch) => {
//   try {
//     let {data: updatedItem} = await axios.post(
//       `/${userId}/currentCart/${productId}`
//     )
//     dispatch(updateCartItem(updatedItem))
//   } catch (error) {
//     console.log(error)
//   }
// }

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
    case ADD_CART_ITEM:
      return {...state, cart: [...state.cart, action.newItem]}
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => {
          return item.id !== action.deletedItem.id
        })
      }
    default:
      return state
  }
}
