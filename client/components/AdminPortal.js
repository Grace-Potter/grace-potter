import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {AllProducts, SingleProductView, AddProduct} from './index'

class AdminPortal extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <h1>Admin Portal</h1>
          <Link to="/admin-portal/manageproducts">Manage Producs</Link>
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
            component={SingleProductView}
          />
          <Route
            path="/admin-portal/manageproducts"
            render={props => <AllProducts {...props} fromPortal={true} />}
          />
          <Route
            path="/admin-portal/manageusers"
            render={() => <h1>Make single and all user components</h1>}
          />
        </Switch>
      </div>
    )
  }
}

export default AdminPortal
