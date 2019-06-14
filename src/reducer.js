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
import { lqm, wam } from './wam'

const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

const initialDInput = (steps) => {
  const dInput = new Array(steps)
  for (let i = 0; i < steps; ++i) {
    dInput[i] = 0
  }
  return dInput
}

const updateD = (timeMax, totalDoseMax, doseMax, line) => {
  const { input, params } = line
  const d = new Array(timeMax)
  for (let i = 0; i < timeMax; ++i) {
    const index = Math.floor((i * input.length) / timeMax)
    d[i] = (input[index] / 10) * doseMax
  }
  line.d = d
  if (params.model === 'lqm') {
    line.line = lqm(d, params)
  } else {
    line.line = wam(d, params)
  }
  line.line = line.line.map((v, i) => [i, v])

  let totalD = 0
  const lineTotal = []
  lineTotal.push([0, line.line[0][1]])
  for (let i = 1; i < line.line.length; ++i) {
    if (d[i - 1] > 0) {
      totalD += d[i - 1]
      lineTotal.push([totalD, line.line[i][1]])
    }
  }
  line.totalD = totalD

  const interpolator = d3
    .scaleLinear()
    .domain(lineTotal.map((row) => row[0]))
    .range(lineTotal.map((row) => row[1]))
  const steps = 1000
  const dStep = totalDoseMax / steps
  line.lineTotal = []
  line.lineTotal.push(lineTotal[0])
  for (let D = dStep; D <= totalDoseMax; D += dStep) {
    line.lineTotal.push([D, D > totalD ? null : interpolator(D)])
  }

  return line
}

const initialState = {
  timeMax: 1200,
  totalDoseMax: 120,
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
    b0: 3.0,
    b1: 1.36,
    alpha: 2.8,
    beta: 1.0
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
      return updateD(
        state.timeMax,
        state.totalDoseMax,
        state.doseMax,
        Object.assign({}, line, { input })
      )
    })
    return state
  },
  [updateLineParams]: (state, action) => {
    const { lineIndex, params } = action.payload
    const lines = Array.from(state.lines)
    const line = Object.assign({}, lines[lineIndex])
    line.params = Object.assign({}, line.params, params)
    lines[lineIndex] = updateD(
      state.timeMax,
      state.totalDoseMax,
      state.doseMax,
      line
    )
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
    lines[lineIndex] = updateD(
      state.timeMax,
      state.totalDoseMax,
      state.doseMax,
      line
    )
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
    lines[lineIndex] = updateD(
      state.timeMax,
      state.totalDoseMax,
      state.doseMax,
      line
    )
    return Object.assign({}, state, {
      lines
    })
  },
  [addLine]: (state, action) => {
    const lines = Array.from(state.lines)
    lines.push(
      updateD(state.timeMax, state.totalDoseMax, state.doseMax, {
        color: colorScale(lines.length),
        input: initialDInput(state.timeGroups),
        params: initialLineParams()
      })
    )
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
