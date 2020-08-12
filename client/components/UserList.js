import React from 'react'
import {UserCard} from './index'

const UserList = ({users}) => {
  console.log(users)
  return (
    <div>
      <h3>User emails</h3>
      <ul>
        {users.length ? (
          users.map(user => <UserCard key={user.id} {...user} />)
        ) : (
          <p>No users to dispaly</p>
        )}
      </ul>
    </div>
  )
}

export default UserList
