import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import userData from './userData'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import cart from './cart'
import categories from './categories'

const reducer = combineReducers({
  user,
  singleProduct,
  allProducts,
  cart,
  userData,
  categories
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleProduct'
export * from './cart'
export * from './allProducts'
export * from './userData'
export * from './categories'
