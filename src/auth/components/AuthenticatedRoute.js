import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'


/**
 * React component for rendering a path that requires authentication. If the
 * user is not authenticated, they will be redirected to the login route.
 * @param authComponent the component that requires user authentication to render
 * @param loggedIn is the user logged in?
 */
class _AuthenticatedRoute extends React.Component {

  static propTypes = {
    // Is the user logged in?
    loggedIn: PropTypes.bool.isRequired,
    // component to be rendered
    authComponent: PropTypes.func.isRequired || PropTypes.element.isRequired
  }

  render = () => {
    const Component = this.props.authComponent
    return <Route render={props => {
      const newProps = {...props, authComponent: null}
      return this.props.loggedIn
        ? (<Component {...newProps}/>)
        : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
    }}/>
  }
}

const mapStateToProps = state => {
  const loggedIn = !!state.auth.token
  return {
    loggedIn
  }
}

const AuthenticatedRoute = connect(mapStateToProps)(_AuthenticatedRoute)

export default AuthenticatedRoute
