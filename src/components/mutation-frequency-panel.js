import React from 'react'
import { connect } from 'react-redux'
import { addLine } from '../actions'
import { exportTimeCSV, exportDoseCSV, exportImage } from '../export'
import MutationChart from './mutation-chart'

const MutationFrequencyPanel = (props) => {
  const { dispatch, lines, timeMax, totalDoseMax, mutationFrequencyMax } = props

  const chart1Ref = React.createRef()
  const chart2Ref = React.createRef()

  return (
    <div className='panel'>
      <p className='panel-heading'>Mutation Frequency</p>
      <div className='panel-block'>
        <div className='control'>
          <div className='field'>
            <MutationChart
              svgRef={chart1Ref}
              lines={lines}
              lineProperty='line'
              width={800}
              height={300}
              topMargin={15}
              bottomMargin={50}
              leftMargin={120}
              rightMargin={20}
              xLabel='Time (hour)'
              xMax={timeMax}
              yMax={mutationFrequencyMax}
            />
          </div>
          <div className='field is-grouped'>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportTimeCSV(lines, 'hour-mf')
                }}
              >
                Save as CSV
              </button>
            </div>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportImage('svg', chart1Ref, 'hour-mf')
                }}
              >
                export SVG
              </button>
            </div>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportImage('png', chart1Ref, 'hour-mf')
                }}
              >
                export PNG
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='panel-block'>
        <div className='control'>
          <div className='field'>
            <MutationChart
              svgRef={chart2Ref}
              lines={lines}
              lineProperty='lineTotal'
              width={800}
              height={300}
              topMargin={15}
              bottomMargin={50}
              leftMargin={120}
              rightMargin={20}
              xLabel='Accumulated dose (Gy)'
              xMax={totalDoseMax}
              yMax={mutationFrequencyMax}
            />
          </div>
          <div className='field is-grouped'>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportDoseCSV(lines, 'hour-mf')
                }}
              >
                Save as CSV
              </button>
            </div>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportImage('svg', chart2Ref, 'dose-mf')
                }}
              >
                Save as SVG
              </button>
            </div>
            <div className='control is-expanded is-hidden-touch'>
              <button
                className='button is-small is-fullwidth'
                onClick={() => {
                  exportImage('png', chart2Ref, 'dose-mf')
                }}
              >
                Save as PNG
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='panel-block'>
        <div className='control'>
          <button
            className='button is-link is-fullwidth'
            onClick={() => {
              dispatch(addLine())
            }}
          >
            Add Line
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect()(MutationFrequencyPanel)
