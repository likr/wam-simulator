import React from 'react'

export const ParameterForm = (props) => {
  const { wamParams, onChange } = props
  const { a0, a1, b0, b1 } = wamParams

  return <form onSubmit={(event) => event.preventDefault()}>
    <div className='field is-horizontal'>
      <div className='field-label'>
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
      <div className='field-label'>
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
      <div className='field-label'>
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
      <div className='field-label'>
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
  </form>
}
