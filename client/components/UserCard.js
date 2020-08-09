import React from 'react'
import {Link} from 'react-router-dom'

const UserCard = ({email, id}) => {
  return (
    <li>
      <Link to={`/admin-portal/manageusers/${id}`}>
        <h3>{email}</h3>
      </Link>
    </li>
  )
}

export default UserCard
