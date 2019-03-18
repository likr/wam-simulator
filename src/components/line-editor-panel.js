import React from 'react'
import { connect } from 'react-redux'
import {
  removeLine,
  resetLine,
  updateColor,
  updateLineParams
} from '../actions'
import DoseChart from './dose-chart'
import MutationChart from './mutation-chart'

const LineEditorPanel = (props) => {
  const {
    lineIndex,
    line,
    timeMax,
    doseMax,
    mutationFrequencyMax,
    timeStep,
    dispatch
  } = props
  const {
    color,
    d,
    input,
    params
  } = line
  const { F0, a0, a1, b0, b1 } = params

  return <div className='panel'>
    <p className='panel-heading'>Line {lineIndex + 1} (D = {d.reduce((a, v) => a + v).toFixed(3)}Gy)</p>
    <div className='panel-block'>
      <div className='control'>
        <label className='label'>Color</label>
        <input
          className='input'
          type='color'
          value={color}
          onChange={(event) => {
            dispatch(updateColor({
              lineIndex,
              color: event.target.value
            }))
          }}
        />
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <label className='label'>Mutation Frequency</label>
        <MutationChart
          lines={[line]}
          width={800}
          height={200}
          topMargin={20}
          bottomMargin={50}
          leftMargin={110}
          rightMargin={20}
          xMax={timeMax}
          yMax={mutationFrequencyMax}
        />
        <label className='label'>Dose Rate</label>
        <DoseChart
          lineIndex={lineIndex}
          line={line}
          width={800}
          height={200}
          topMargin={20}
          bottomMargin={50}
          leftMargin={110}
          rightMargin={20}
          xMax={timeMax}
          yMax={doseMax}
          xStep={timeStep}
          yStep={10}
        />
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <label className='label'>Parameters</label>
        <div className='field is-horizontal'>
          <div className='field-label is-normal' style={{ textAlign: 'left' }}>
            <label className='label'>a<sub>0</sub> = {a0.toFixed(2)}e-8</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input
                  className='slider is-fullwidth'
                  type='range'
                  min='0'
                  max='10'
                  step='0.01'
                  value={a0}
                  onChange={(event) => {
                    dispatch(updateLineParams({ lineIndex, params: { a0: +event.target.value } }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-label is-normal' style={{ textAlign: 'left' }}>
            <label className='label'>a<sub>1</sub> = {a1.toFixed(2)}e-4</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input
                  className='slider is-fullwidth'
                  type='range'
                  min='0'
                  max='10'
                  step='0.01'
                  value={a1}
                  onChange={(event) => {
                    dispatch(updateLineParams({ lineIndex, params: { a1: +event.target.value } }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-label is-normal' style={{ textAlign: 'left' }}>
            <label className='label'>b<sub>0</sub> = {b0.toFixed(2)}e-3</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input
                  className='slider is-fullwidth'
                  type='range'
                  min='0'
                  max='10'
                  step='0.01'
                  value={b0}
                  onChange={(event) => {
                    dispatch(updateLineParams({ lineIndex, params: { b0: +event.target.value } }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-label is-normal' style={{ textAlign: 'left' }}>
            <label className='label'>b<sub>1</sub> = {b1.toFixed(2)}e-1</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input
                  className='slider is-fullwidth'
                  type='range'
                  min='0'
                  max='10'
                  step='0.01'
                  value={b1}
                  onChange={(event) => {
                    dispatch(updateLineParams({ lineIndex, params: { b1: +event.target.value } }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='field is-horizontal'>
          <div className='field-label is-normal' style={{ textAlign: 'left' }}>
            <label className='label'>F<sub>0</sub> = {F0.toFixed(2)}e-5</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <div className='control'>
                <input
                  className='slider is-fullwidth'
                  type='range'
                  min='0'
                  max='100'
                  step='1'
                  value={F0}
                  onChange={(event) => {
                    dispatch(updateLineParams({ lineIndex, params: { F0: +event.target.value } }))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <div className='field is-grouped'>
          <div className='control'>
            <button
              className='button'
              onClick={() => {
                dispatch(resetLine({ lineIndex }))
              }}
            >
              Reset
            </button>
          </div>
          <div className='control'>
            <button
              className='button'
              onClick={() => {
                dispatch(removeLine({ lineIndex }))
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default connect()(LineEditorPanel)
