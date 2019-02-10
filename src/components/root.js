import React from 'react'
import { connect } from 'react-redux'
import DoseRateEditor from './dose-rate-editor'
import MutatonChart from './mutation-chart'
import ParameterForm from './parameter-form'

const Root = (props) => {
  const {
    size,
    d,
    dInput,
    wamParams
  } = props
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
      />
    </div>
    <div className='column'>
      <h3 className='title'>Dose</h3>
      <DoseRateEditor
        d={dInput}
        width={width}
        height={height}
        leftMargin={leftMargin}
        rightMargin={rightMargin}
        topMargin={topMargin}
        bottomMargin={bottomMargin}
        xMax={size}
        yMax={0.1}
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

export default connect(
  (state) => {
    const { size, dInput } = state
    const yMax = 0.1
    const d = new Array(size)
    for (let i = 0; i < size; ++i) {
      const index = Math.floor(i * dInput.length / size)
      d[i] = (dInput[index] / 10) * yMax
    }
    return Object.assign({}, state, {
      d
    })
  }
)(Root)
