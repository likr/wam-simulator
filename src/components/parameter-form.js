import React from 'react'
import { presets } from '../preset'

export const ParameterForm = (props) => {
  const { wamParams, onChange } = props
  const { F0, a0, a1, b0, b1 } = wamParams

  return <form onSubmit={(event) => event.preventDefault()}>

    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>Preset</label>
      </div>
      <div className='field-body'>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <div className='select is-fullwidth'>
              <select>
                {
                  presets.map(({ name }) => {
                    return <option value={name}>{name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <button
              className='button'
              onClick={() => {
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
              defaultValue={a0}
              onChange={(event) => onChange({ a0: +event.target.value })}
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
              defaultValue={a1}
              onChange={(event) => onChange({ a1: +event.target.value })}
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
              defaultValue={b0}
              onChange={(event) => onChange({ b0: +event.target.value })}
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
              defaultValue={b1}
              onChange={(event) => onChange({ b1: +event.target.value })}
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
              defaultValue={F0}
              onChange={(event) => onChange({ F0: +event.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  </form>
}
