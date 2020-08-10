import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'
// const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

/**
 * ACTION CREATORS
 */
const getCategory = category => ({
  type: GET_CATEGORY,
  category
})

// const updateCategory = category => ({
//   type: UPDATE_CATEGORY,
//   category
// })

/**
 * THUNK CREATORS
 */
export const fetchCategory = categoryId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/products/category/${categoryId}`)
    dispatch(getCategory(data))
  } catch (error) {
    console.log(error)
  }
}

// export const putCategory = (category, categoryId) => async (dispatch) => {
//   try {
//     const {data: newCategory} = await axios.put(
//       `/api/products/category/${categoryId}`,
//       category
//     )
//     dispatch(updateCategory(newCategory))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
const initialState = {
  testState: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {...state, testState: action.category}

    // case UPDATE_CATEGORY:
    //   return {
    //     ...state,
    //     testState: action.category,
    //   }

    default:
      return state
  }
}
