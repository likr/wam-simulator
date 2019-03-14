import React from 'react'
import { connect } from 'react-redux'
import {
  updateParams
} from '../actions'

const ParameterFormPanel = (props) => {
  const { params, dispatch } = props
  const {
    timeMax,
    timeGroups,
    mutationFrequencyMax,
    doseMax
  } = params

  const timeMaxRef = React.createRef()
  const timeGroupsRef = React.createRef()
  const mutationFrequencyMaxRef = React.createRef()
  const doseMaxRef = React.createRef()

  return <div className='panel'>
    <form
      onSubmit={(event) => {
        event.preventDefault()
        dispatch(updateParams({
          timeMax: +timeMaxRef.current.value,
          timeGroups: +timeGroupsRef.current.value,
          mutationFrequencyMax: +mutationFrequencyMaxRef.current.value,
          doseMax: +doseMaxRef.current.value
        }))
      }}
    >
      <p className='panel-heading'>Parameters</p>
      <div className='panel-block'>
        <div className='control'>
          <div className='field'>
            <label className='label'>t<sub>max</sub></label>
            <div className='control'>
              <input
                ref={timeMaxRef}
                className='input'
                aria-label='t_r'
                type='number'
                min='0'
                step='1'
                defaultValue={timeMax}
              />
            </div>
            <p className='help'>Maximum value of horizontal axis (time (hour))</p>
          </div>
          <div className='field'>
            <label className='label'>t<sub>div</sub></label>
            <div className='control'>
              <input
                ref={timeGroupsRef}
                className='input'
                aria-label='n'
                type='number'
                min='1'
                step='1'
                defaultValue={timeGroups}
              />
            </div>
            <p className='help'>Number of horizontal partitions</p>
          </div>
          <div className='field'>
            <label className='label'>F<sub>max</sub></label>
            <div className='control'>
              <input
                ref={mutationFrequencyMaxRef}
                className='input'
                aria-label='F_max'
                type='number'
                min='0'
                max='0.001'
                step='0.0001'
                defaultValue={mutationFrequencyMax}
              />
            </div>
            <p className='help'>Maximum value of vertical axis (mutation frequency)</p>
          </div>
          <div className='field'>
            <label className='label'>d<sub>max</sub></label>
            <div className='control'>
              <input
                ref={doseMaxRef}
                className='input'
                aria-label='d_max'
                type='number'
                min='0'
                max='10'
                step='0.1'
                defaultValue={doseMax}
              />
            </div>
            <p className='help'>Maximum value of vertical axis (dose rate (Gy/hour))</p>
          </div>
        </div>
      </div>
      <div className='panel-block'>
        <button className='button is-fullwidth'>Apply</button>
      </div>
    </form>
  </div>
}

export default connect()(ParameterFormPanel)
