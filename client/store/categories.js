import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  try {
    const {data: categories} = await axios.get('/api/categories')
    dispatch(getCategories(categories))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const initialState = []
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

    default:
      return state
  }
}
