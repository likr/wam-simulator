import React from 'react'
import { connect } from 'react-redux'
import {
  updateParams
} from '../actions'
import { presets } from '../preset'

const ParameterForm = (props) => {
  const { wamParams, dispatch } = props
  const { F0, a0, a1, b0, b1 } = wamParams
  const presetRef = React.createRef()

  return <form onSubmit={(event) => event.preventDefault()}>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>Preset</label>
      </div>
      <div className='field-body'>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <div className='select is-fullwidth'>
              <select ref={presetRef}>
                {
                  presets.map(({ name }) => {
                    return <option key={name} value={name}>{name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <button
              className='button'
              onClick={() => {
                const preset = presets.find(({ name }) => name === presetRef.current.value)
                dispatch(updateParams(preset.value))
              }}
            >
              Load
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>a<sub>0</sub></label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='0'
              step='1e-9'
              value={a0}
              onChange={(event) => {
                dispatch(updateParams({ a0: +event.target.value }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>a<sub>1</sub></label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='0'
              step='1e-6'
              value={a1}
              onChange={(event) => {
                dispatch(updateParams({ a1: +event.target.value }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>b<sub>0</sub></label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='1e-4'
              step='1e-4'
              value={b0}
              onChange={(event) => {
                dispatch(updateParams({ b0: +event.target.value }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>b<sub>1</sub></label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='0'
              step='1e-2'
              value={b1}
              onChange={(event) => {
                dispatch(updateParams({ b1: +event.target.value }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>F<sub>0</sub></label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              className='input'
              type='number'
              min='0'
              step='1e-5'
              value={F0}
              onChange={(event) => {
                dispatch(updateParams({ F0: +event.target.value }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </form>
}

export default connect()(ParameterForm)
