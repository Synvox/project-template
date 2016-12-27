import './extras'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './api/store'
const history = syncHistoryWithStore(browserHistory, store)

import Index from './screens/index'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Index}>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
