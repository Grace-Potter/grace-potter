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
    const {firstName, lastName} = this.props.user

    return (
      <div>{this.props.user.id && <h1>{`${firstName} ${lastName}`}</h1>}</div>
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
