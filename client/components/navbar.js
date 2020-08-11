import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Col,
  Row
} from 'reactstrap'

const Navigate = ({handleClick, isLoggedIn, isAdmin}) => (
  // <div>
  //   <h1>Grace Potter</h1>
  //   <nav>
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/home">Home</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //         {isAdmin && <Link to="/admin-portal">Admin Portal</Link>}
  //       </div>
  //     ) : (
  //       <div>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //       </div>
  //     )}
  //     <div>
  //       <Link to="/products">All Products</Link>
  //       <Link to="/cart">Cart</Link>
  //     </div>
  //   </nav>
  //   {/* <hr /> */}
  // </div>

  <div>
    <h1>Grace Potter</h1>
    <nav className="navbar">
      <Link to="/products">All Products</Link>
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
    {/* <hr /> */}
  </div>

  // <div>
  //   <h1>Grace Potter</h1>
  //   <Navbar light expand="md" >
  //     <Nav className='navbar'>
  //       <Link to="/products" className='navLeft'>All Products</Link>
  //     </Nav>
  //     {isLoggedIn ? (
  //       <Nav className='mr-auto navRight' navbar >

  //         {/* The navbar will show these links after you log in */}
  //         {/* <Link to="/home">Home</Link> */}
  //       <NavLink href="#" onClick={handleClick}>Logout</NavLink>
  //         {isAdmin && <Link to="/admin-portal">Admin Portal</Link>}

  //       </Nav>

  //     ) : (
  //       <Nav className='cart navbar'>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //       </Nav>

  //     )}

  //     <Nav className='cart navbar'>
  //       <Link to="/cart">Cart</Link>
  //     </Nav>
  //   </Navbar>

  // </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
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
