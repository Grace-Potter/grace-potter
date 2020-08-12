import React from 'react'
import {Link} from 'react-router-dom'

const UserCard = ({email, id}) => {
  return (
    <div>
      <Link to={`/admin-portal/manageusers/${id}`}>
        <h3>{email}</h3>
      </Link>
    </div>
  )
}

export default UserCard
