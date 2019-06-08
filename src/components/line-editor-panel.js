import React from 'react'
import { connect } from 'react-redux'
import {
  removeLine,
  resetLine,
  updateColor,
  updateLineParams
} from '../actions'
import { exportImage } from '../export'
import DoseChart from './dose-chart'
import MutationChart from './mutation-chart'

const Slider = ({ property, value, digits, lineIndex, dispatch, children }) => {
  return <div className='field'>
    <label className='label is-small has-text-centered'>{children} = {value.toFixed(2)}e-{digits}</label>
    <div className='control'>
      <input
        className='slider is-small is-fullwidth'
        type='range'
        min='0'
        max='10'
        step='0.1'
        value={value}
        onChange={(event) => {
          dispatch(updateLineParams({ lineIndex, params: { [property]: +event.target.value } }))
        }}
      />
    </div>
  </div>
}

const WAMFields = ({ a0, a1, b0, b1, lineIndex, dispatch }) => {
  return <>
    <Slider property='a0' value={a0} digits='8' lineIndex={lineIndex} dispatch={dispatch}>
      a<sub>0</sub>
    </Slider>
    <Slider property='a1' value={a1} digits='5' lineIndex={lineIndex} dispatch={dispatch}>
      a<sub>1</sub>
    </Slider>
    <Slider property='b0' value={b0} digits='3' lineIndex={lineIndex} dispatch={dispatch}>
      b<sub>0</sub>
    </Slider>
    <Slider property='b1' value={b1} digits='1' lineIndex={lineIndex} dispatch={dispatch}>
      b<sub>1</sub>
    </Slider>
  </>
}

const LQMFields = ({ alpha, beta, lineIndex, dispatch }) => {
  return <>
    <Slider property='alpha' value={alpha} digits='5' lineIndex={lineIndex} dispatch={dispatch}>
      a<sub>0</sub>
    </Slider>
    <Slider property='beta' value={beta} digits='6' lineIndex={lineIndex} dispatch={dispatch}>
      a<sub>0</sub>
    </Slider>
  </>
}

const LineEditorPanel = (props) => {
  const {
    lineIndex,
    line,
    timeMax,
    totalDoseMax,
    doseMax,
    mutationFrequencyMax,
    timeStep,
    dispatch
  } = props
  const {
    color,
    totalD,
    input,
    params
  } = line
  const { model, F0, a0, a1, b0, b1, alpha, beta } = params

  const chart1Ref = React.createRef()
  const chart2Ref = React.createRef()
  const chart3Ref = React.createRef()

  return <div className='panel'>
    <p className='panel-heading'>Line {lineIndex + 1} (D = {totalD.toFixed(3)}Gy)</p>
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
        <div className='field'>
          <MutationChart
            svgRef={chart1Ref}
            lines={[line]}
            lineProperty='line'
            width={800}
            height={200}
            topMargin={20}
            bottomMargin={50}
            leftMargin={110}
            rightMargin={20}
            xLabel='Time (hour)'
            xMax={timeMax}
            yMax={mutationFrequencyMax}
          />
        </div>
        <div className='field'>
          <MutationChart
            svgRef={chart2Ref}
            lines={[line]}
            lineProperty='lineTotal'
            width={800}
            height={200}
            topMargin={20}
            bottomMargin={50}
            leftMargin={110}
            rightMargin={20}
            xLabel='Accumulated Dose (Gy)'
            xMax={totalDoseMax}
            yMax={mutationFrequencyMax}
          />
        </div>
        <label className='label'>Dose Rate</label>
        <div className='field'>
          <DoseChart
            svgRef={chart3Ref}
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
        <div className='field is-grouped'>
          <div className='control is-expanded is-hidden-touch'>
            <button className='button is-small is-fullwidth' onClick={() => { exportImage('svg', chart3Ref, `line${lineIndex + 1}-hour-dose`) }}>Save as SVG</button>
          </div>
          <div className='control is-expanded is-hidden-touch'>
            <button className='button is-small is-fullwidth' onClick={() => { exportImage('png', chart3Ref, `line${lineIndex + 1}-hour-dose`) }}>Save as PNG</button>
          </div>
        </div>
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <label className='label'>Parameters</label>
        <div className='field'>
          <div className='control'>
            <div className='select is-small is-fullwidth'>
              <select
                value={model}
                onChange={(event) => {
                  dispatch(updateLineParams({ lineIndex, params: { model: event.target.value } }))
                }}
              >
                <option value='wam'>WAM</option>
                <option value='lqm'>LQM</option>
              </select>
            </div>
          </div>
        </div>
        {
          model === 'wam'
            ? <WAMFields a0={a0} a1={a1} b0={b0} b1={b1} lineIndex={lineIndex} dispatch={dispatch} />
            : <LQMFields alpha={alpha} beta={beta} lineIndex={lineIndex} dispatch={dispatch} />
        }
        <Slider property='F0' value={F0} digits='5' lineIndex={lineIndex} dispatch={dispatch}>
          F<sub>0</sub>
        </Slider>
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <div className='field is-grouped'>
          <div className='control is-expanded'>
            <button
              className='button is-small is-fullwidth'
              onClick={() => {
                dispatch(resetLine({ lineIndex }))
              }}
            >
              Reset
            </button>
          </div>
          <div className='control is-expanded'>
            <button
              className='button is-small is-fullwidth'
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
