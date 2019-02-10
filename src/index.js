import 'bulma/css/bulma.min.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer'
import Root from './components/root'

const store = createStore(reducer)

const App = () => {
  return <Provider store={store}>
    <div>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <a className='navbar-item'>
              <h1>WAM Simulator</h1>
            </a>
          </div>
        </div>
      </nav>
      <section className='section'>
        <div className='container'>
          <Router>
            <Route path='/' component={Root} exact />
          </Router>
        </div>
      </section>
    </div>
  </Provider>
}

render(<App />, document.getElementById('content'))
