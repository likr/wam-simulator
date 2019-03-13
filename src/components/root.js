import React from 'react'
import { connect } from 'react-redux'
import LineEditorPanel from './line-editor-panel'
import MutationFrequencyPanel from './mutation-frequency-panel'
import ParameterFormPanel from './parameter-form-panel'

const Root = (props) => {
  const {
    lines,
    timeMax,
    timeGroups,
    mutationFrequencyMax,
    doseMax
  } = props
  return <div>
    <div className='columns'>
      <div className='column is-one-third'>
        <ParameterFormPanel params={props} />
      </div>
      <div className='column'>
        <MutationFrequencyPanel
          lines={lines}
          xMax={timeMax}
          yMax={mutationFrequencyMax}
        />
      </div>
    </div>
    <div className='columns is-multiline'>
      {
        lines.map((line, i) => {
          return <div className='column is-half' key={i}>
            <LineEditorPanel
              lineIndex={i}
              line={line}
              timeMax={timeMax}
              doseMax={doseMax}
              mutationFrequencyMax={mutationFrequencyMax}
              timeStep={timeGroups}
            />
          </div>
        })
      }
    </div>
  </div>
}

export default connect((state) => state)(Root)
