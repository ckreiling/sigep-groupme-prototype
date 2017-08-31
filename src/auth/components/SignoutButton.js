import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {deleteToken} from "../actions/auth"

/**
 * Displays a signout button if the user is logged in,
 * or a message if the user is not logged in.
 */
class _SignoutButton extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  }

  render = () => (
    this.props.loggedIn
      ? <button value="SIGN OUT" onClick={this.props.logout}>SIGN OUT</button>
      : <div>Please login.<Redirect to="/login"/></div>
  )
}

const mapStateToProps = state => {
  const loggedIn = !!state.auth.token
  return {
    loggedIn
  }
}

const mapDispatchToProps = dispatch => ({logout: () => dispatch(deleteToken())})

const SignoutButton = connect(mapStateToProps, mapDispatchToProps)(_SignoutButton)

export default SignoutButton