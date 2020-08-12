import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {
  AllProducts,
  AddProduct,
  UpdateProduct,
  AllUsers,
  SingleUser
} from './index'

class AdminPortal extends React.Component {
  render() {
    return (
      <div className="background pageView">
        <h3>Admin Portal</h3>
        <nav className="navbar">
          <Link to="/admin-portal/manageproducts">Manage Products</Link>
          <Link to="/admin-portal/manageusers">Manage Users</Link>
        </nav>
        <Switch>
          <Route
            exact
            path="/admin-portal/manageproducts/addproduct"
            component={AddProduct}
          />
          <Route
            path="/admin-portal/manageproducts/:productId"
            component={UpdateProduct}
          />
          <Route
            path="/admin-portal/manageproducts"
            render={props => <AllProducts {...props} fromPortal={true} />}
          />
          <Route
            exact
            path="/admin-portal/manageusers/:userId"
            component={SingleUser}
          />
          <Route path="/admin-portal/manageusers" component={AllUsers} />
        </Switch>
      </div>
    )
  }
}

export default AdminPortal
