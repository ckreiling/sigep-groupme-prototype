import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {fetchToken} from "../actions/auth"

// Call this as a function in usage - React will render it about 50% faster.
const LoginErrorBox = (errorText) => (
  errorText
    ? <div>{errorText}</div>
    : null
)

class _Login extends React.Component {

  static propTypes = {
    // The user's auth token stored in the state.
    token: PropTypes.string,
    // Is the state fetching the token (logging the user in)?
    isFetching: PropTypes.bool.isRequired,
    // auth function callback takes username and password
    login: PropTypes.func.isRequired,
    // The error message
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  login = () => {
    this.props.login(this.state.username, this.state.password)
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({[name]: value})
  }

  render = () => (
    this.props.token
      ? <Redirect to="/dashboard"/>
      :
      <form>
        {LoginErrorBox(this.props.error)}
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        <input type="button" value="SUBMIT" onClick={this.login}/>
      </form>
  )
}

const mapStateToProps = state => {
  const {token, isFetching, error} = state.auth
  return {
    token, isFetching, error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(fetchToken(username, password))
    }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)

export default Login
