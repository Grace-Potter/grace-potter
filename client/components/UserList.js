import React from 'react'
import {UserCard} from './index'

const UserList = ({users}) => {
  console.log(users)
  return (
    <ul>
      {users.length ? (
        users.map(user => <UserCard key={user.id} {...user} />)
      ) : (
        <h3>No users to dispaly</h3>
      )}
    </ul>
  )
}

export default UserList
