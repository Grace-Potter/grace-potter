import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
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
  CardTitle
} from 'reactstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    //   <a href="/auth/google">{displayName} with Google</a>
    // </div>
    <Card className="auth shadow p-3 mb-5 bg-white rounded">
      <CardBody>
        <CardTitle>
          <h4>{displayName}</h4>
        </CardTitle>
        <Form onSubmit={handleSubmit} name={name}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="example@email.com" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="1Jdhyw3uaB" />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
          <FormGroup>
            <a href="/auth/google">{displayName} with Google</a>
          </FormGroup>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </CardBody>
    </Card>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
