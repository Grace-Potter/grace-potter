import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'
// const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

// const removeCategory = category => ({
//   type: DELETE_CATEGORY,
//   category
// })

// const addCategory = category => ({
//   type: ADD_CATEGORY,
//   category
// })

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  try {
    const {data: categories} = await axios.get('/api/products/category')
    dispatch(getCategories(categories))
  } catch (err) {
    console.error(err)
  }
}

// export const deletecategories = category => async dispatch => {
//   try {
//     await axios.delete(`/api/products/${category}`)
//     dispatch(removeCategory(category))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const postCategory = category => async dispatch => {
//   try {
//     const {data: newCategory} = await axios.post('/api/products/category', category)
//     dispatch(addCategory(newCategory))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

    // case DELETE_CATEGORY:
    //   return state.filter((category) => category.id !== action.categoryId)

    // case ADD_CATEGORY:
    //   return [...state, action.category]

    default:
      return state
  }
}
