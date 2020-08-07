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

const deleteCartItem = deletedItem => ({
  type: DELETE_CART_ITEM,
  deletedItem
})

/**
 * THUNK CREATORS
 */
export const fetchCart = userId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/${userId}/currentCart`) // This route is a placeholder until the cart routes become available
    dispatch(getCart(data))
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
