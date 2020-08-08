import React from 'react'
import {Link} from 'react-router-dom'

const UserCard = ({email, id}) => {
  return (
    <l1>
      <Link to={`/admin-portal/manageusers/${id}`}>
        <h3>{email}</h3>
      </Link>
    </l1>
  )
}

export default UserCard
