import React, {Component} from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import Login from "./auth/components/Login"
import AuthenticatedRoute from "./auth/components/AuthenticatedRoute"
import LoginStatus from './auth/components/SignoutButton'
import Dashboard from "./dashboard/components"

class App extends Component {
  render = () => (
    <BrowserRouter>
      <div>
        <LoginStatus/>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <AuthenticatedRoute path="/dashboard" authComponent={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
