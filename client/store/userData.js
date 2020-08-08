import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const getSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users')
    dispatch(getAllUsers(users))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleUser = userId => async dispatch => {
  try {
    const {data: user} = await axios.get(`/api/users/${userId}`)
    dispatch(getSingleUser(user))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users
      }

    case GET_SINGLE_USER:
      return {
        ...state,
        singleUser: action.user
      }

    default:
      return state
  }
}
