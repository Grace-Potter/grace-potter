import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navigate = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Grace Potter</h1>
    <nav className="navbar">
      <Link to="/products">Home</Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {isAdmin && <Link to="/admin-portal">Admin Portal</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <div>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.email,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navigate)

/**
 * PROP TYPES
 */
Navigate.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
