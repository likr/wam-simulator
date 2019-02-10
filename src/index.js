import 'bulma/css/bulma.min.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { DoseRateEditor } from './components/dose-rate-editor'
import { MutatonChart } from './components/mutation-chart'
import { ParameterForm } from './components/parameter-form'

class Index extends React.Component {
  constructor () {
    super()
    const size = 1200
    const line = new Array(size)
    for (let i = 0; i < size; ++i) {
      line[i] = 0
    }
    this.state = {
      d: line,
      wamParams: {
        F0: 1e-5,
        a0: 3.2e-8,
        a1: 3.0e-5,
        b0: 3.0e-3,
        b1: 1.4e-1
      }
    }
  }

  render () {
    const { d, wamParams } = this.state
    const size = 1200
    const width = 800
    const height = 500
    const leftMargin = 100
    const rightMargin = 100
    const bottomMargin = 80
    const topMargin = 20
    const maxValue = 2e-4
    return <div className='columns'>
      <div className='column is-one-third'>
        <h3 className='title'>Parameters</h3>
        <ParameterForm
          wamParams={wamParams}
          onChange={(params) => {
            this.setState({
              wamParams: Object.assign({}, wamParams, params)
            })
          }}
        />
      </div>
      <div className='column'>
        <h3 className='title'>Dose</h3>
        <DoseRateEditor
          width={width}
          height={height}
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          topMargin={topMargin}
          bottomMargin={bottomMargin}
          xMax={size}
          yMax={0.1}
          onChange={(d) => {
            this.setState({ d })
          }}
        />
        <h3 className='title'>Mutation frequency</h3>
        <MutatonChart
          width={width}
          height={height}
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          topMargin={topMargin}
          bottomMargin={bottomMargin}
          xMax={size}
          yMax={maxValue}
          d={d}
          wamParams={wamParams}
        />
      </div>
    </div>
  }
}

const App = () => {
  return <div>
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
          <Route path='/' component={Index} exact />
        </Router>
      </div>
    </section>
  </div>
}

render(<App />, document.getElementById('content'))
