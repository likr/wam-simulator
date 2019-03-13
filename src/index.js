import 'bulma/css/bulma.min.css'
import 'bulma-slider/dist/css/bulma-slider.min.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer'
import Root from './components/root'

if ('serviceWorker' in navigator) {
  const swName = '/sw.js'
  navigator.serviceWorker.register(swName)
}

const store = createStore(reducer)

const App = () => {
  return <Provider store={store}>
    <Router>
      <Route path='/' component={Root} exact />
    </Router>
  </Provider>
}

render(<App />, document.getElementById('content'))
