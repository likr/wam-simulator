import { createReducer } from 'redux-starter-kit'
import * as d3 from 'd3'
import {
  addLine,
  removeLine,
  resetLine,
  updateColor,
  updateDInput,
  updateLineParams,
  updateParams
} from './actions'
import {
  lqm,
  wam
} from './wam'

const initialDInput = (steps) => {
  const dInput = new Array(steps)
  for (let i = 0; i < steps; ++i) {
    dInput[i] = 0
  }
  return dInput
}

const updateD = (xMax, yMax, line) => {
  const { input, params } = line
  const d = new Array(xMax)
  for (let i = 0; i < xMax; ++i) {
    const index = Math.floor(i * input.length / xMax)
    d[i] = (input[index] / 10) * yMax
  }
  line.d = d
  if (params.model === 'lqm') {
    line.line = lqm(d, params)
  } else {
    line.line = wam(d, params)
  }
  return line
}

const initialState = {
  timeMax: 1200,
  timeGroups: 24,
  mutationFrequencyMax: 2e-4,
  doseMax: 0.1,
  lines: []
}

const initialLineParams = () => {
  return {
    model: 'wam',
    F0: 1,
    a0: 3.24,
    a1: 2.94,
    b0: 3.00,
    b1: 1.36,
    alpha: 2.79,
    beta: 2.32
  }
}

export const reducer = createReducer(initialState, {
  [updateParams]: (prevState, action) => {
    const state = Object.assign({}, prevState, action.payload)
    state.lines = state.lines.map((line) => {
      const input = Array.from(line.input)
      while (state.timeGroups > input.length) {
        input.push(0)
      }
      while (state.timeGroups < input.length) {
        input.pop()
      }
      return updateD(state.timeMax, state.doseMax, Object.assign({}, line, { input }))
    })
    return state
  },
  [updateLineParams]: (state, action) => {
    const { lineIndex, params } = action.payload
    const lines = Array.from(state.lines)
    const line = Object.assign({}, lines[lineIndex])
    line.params = Object.assign({}, line.params, params)
    lines[lineIndex] = updateD(state.timeMax, state.doseMax, line)
    return Object.assign({}, state, {
      lines
    })
  },
  [removeLine]: (state, action) => {
    const { lineIndex } = action.payload
    const lines = Array.from(state.lines)
    lines.splice(lineIndex, 1)
    return Object.assign({}, state, {
      lines
    })
  },
  [resetLine]: (state, action) => {
    const { lineIndex } = action.payload
    const lines = Array.from(state.lines)
    const line = Object.assign({}, lines[lineIndex])
    line.input = initialDInput(state.timeGroups)
    line.params = initialLineParams()
    lines[lineIndex] = updateD(state.timeMax, state.doseMax, line)
    return Object.assign({}, state, {
      lines
    })
  },
  [updateDInput]: (state, action) => {
    const { lineIndex, i, j } = action.payload
    const lines = Array.from(state.lines)
    const line = Object.assign({}, lines[lineIndex])
    const input = Array.from(line.input)
    if (input[i] === j + 1) {
      input[i] = 0
    } else {
      input[i] = j + 1
    }
    line.input = input
    lines[lineIndex] = updateD(state.timeMax, state.doseMax, line)
    return Object.assign({}, state, {
      lines
    })
  },
  [addLine]: (state, action) => {
    const lines = Array.from(state.lines)
    lines.push(updateD(state.timeMax, state.doseMax, {
      color: d3.hsl(Math.random() * 360, 1, 0.5).hex(),
      input: initialDInput(state.timeGroups),
      params: initialLineParams()
    }))
    return Object.assign({}, state, {
      lines
    })
  },
  [updateColor]: (state, action) => {
    const { lineIndex, color } = action.payload
    const lines = Array.from(state.lines)
    const line = Object.assign({}, lines[lineIndex])
    line.color = color
    lines[lineIndex] = line
    return Object.assign({}, state, {
      lines
    })
  }
})
