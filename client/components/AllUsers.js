import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/index'
import {UserList} from './index'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Card,
  CardBody,
  CardTitle,
  Row
} from 'reactstrap'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div className="pageView">
        <h3>All Users</h3>
        <Card className="singleProduct shadow p-3 mb-5 bg-white rounded">
          <UserList users={this.props.users} />
        </Card>
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
