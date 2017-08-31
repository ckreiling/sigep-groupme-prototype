import React from 'react'
import {connect} from 'react-redux'

const _Dashboard = props => <div>You've reached the dashboard! Your auth token is {props.token}</div>

const mapStateToProps = state => (
  {token: state.auth.token}
)

const Dashboard = connect(mapStateToProps)(_Dashboard)

export default Dashboard

