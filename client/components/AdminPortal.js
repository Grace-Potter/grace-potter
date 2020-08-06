import React from 'react'
import {Link} from 'react-router-dom'

class AdminPortal extends React.Component {
  render() {
    return (
      <nav>
        <h1>Admin Portal</h1>
        <Link to="/admin-portal/manageproducts">Manage Producs</Link>
        <Link to="/admin-portal/manageusers">Manage Users</Link>
      </nav>
    )
  }
}

export default AdminPortal
