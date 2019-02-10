import { createReducer } from 'redux-starter-kit'
import {
  updateParams,
  updateDInput,
  resetDInput
} from './actions'

const initialDInput = (steps) => {
  const dInput = new Array(steps)
  for (let i = 0; i < steps; ++i) {
    dInput[i] = 0
  }
  return dInput
}

const initialSize = 1200
const initialState = {
  size: initialSize,
  dInput: initialDInput(24),
  wamParams: {
    F0: 1e-5,
    a0: 3.2e-8,
    a1: 3.0e-5,
    b0: 3.0e-3,
    b1: 1.4e-1
  }
}

export const reducer = createReducer(initialState, {
  [updateParams]: (state, action) => {
    return Object.assign({}, state, {
      wamParams: Object.assign({}, state.wamParams, action.payload)
    })
  },
  [resetDInput]: (state, action) => {
    return Object.assign({}, state, {
      dInput: initialDInput(24)
    })
  },
  [updateDInput]: (state, action) => {
    const dInput = Array.from(state.dInput)

    const { i, j } = action.payload
    if (dInput[i] === j + 1) {
      dInput[i] = 0
    } else {
      dInput[i] = j + 1
    }

    return Object.assign({}, state, {
      dInput
    })
  }
})
