import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/index'
import {UserList} from './index'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h1>All Users</h1>
        <UserList users={this.props.users} />
      </div>
    )
  }
}

const mapState = state => ({
  users: state.userData.allUsers
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
