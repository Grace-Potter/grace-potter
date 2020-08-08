import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/index'

class SingleUser extends React.Component {
  componentDidMount() {
    // load user
    const id = this.props.match.params.userId
    this.props.getUser(id)
  }

  render() {
    const {firstName, lastName, email, id, orders} = this.props.user

    return id ? (
      <div>
        <h1>{`${firstName} ${lastName}`}</h1>
        <p>User id: {id}</p>
        <p>Email: {email}</p>
        <div>
          <p>Orders:</p>
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                id: {order.id} | status: {order.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <h1> Loading... </h1>
    )
  }
}

const mapState = state => ({
  user: state.userData.singleUser
})

const mapDispatch = dispatch => ({
  getUser: id => dispatch(fetchSingleUser(id))
})

export default connect(mapState, mapDispatch)(SingleUser)
