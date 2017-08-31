import React, {Component} from 'react'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {autoRehydrate, persistStore} from 'redux-persist'
import {auth} from './auth/reducers/auth'

import App from './App'

const rootReducer = combineReducers({auth})

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createLogger(),
    ),
    autoRehydrate()
  )
)

/**
 * This class provides the App with an attached Redux store
 * as soon as the state has been persisted.
 */
export default class AppProvider extends Component {

  constructor() {
    super()
    this.state = {rehydrated: false}
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({rehydrated: true})
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }
    return <App/>
  }
}
