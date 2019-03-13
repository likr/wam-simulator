import { createAction } from 'redux-starter-kit'

export const addLine = createAction('add-line')
export const removeLine = createAction('remove-line')
export const resetLine = createAction('reset-line')
export const updateColor = createAction('update-color')
export const updateDInput = createAction('update-d-input')
export const updateLineParams = createAction('update-line-params')
export const updateParams = createAction('update-params')
