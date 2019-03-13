import React from 'react'
import { connect } from 'react-redux'
import { addLine } from '../actions'
import MutationChart from './mutation-chart'

const MutationFrequencyPanel = (props) => {
  const {
    dispatch,
    lines,
    xMax,
    yMax
  } = props
  return <div className='panel'>
    <p className='panel-heading'>Mutation Frequency</p>
    <div className='panel-block'>
      <div className='control'>
        <MutationChart
          lines={lines}
          width={800}
          height={300}
          topMargin={20}
          bottomMargin={20}
          leftMargin={80}
          rightMargin={20}
          xMax={xMax}
          yMax={yMax}
        />
      </div>
    </div>
    <div className='panel-block'>
      <div className='control'>
        <div className='field is-grouped'>
          <div className='control'>
            <button
              className='button is-primary'
              onClick={() => {
                dispatch(addLine())
              }}
            >
              Add Line
            </button>
          </div>
          <div className='control'>
            <a
              className='button'
              onClick={(event) => {
                const dHead = lines.map((_, i) => `D_${i + 1}(t)`).join(',')
                const fHead = lines.map((_, i) => `F_${i + 1}(t)`).join(',')
                const head = `t,${dHead},${fHead}`
                const rows = []
                for (let t = 0; t < xMax; ++t) {
                  const dValues = lines.map(({ d }) => d[t]).join(',')
                  const fValues = lines.map(({ line }) => line[t]).join(',')
                  rows.push(`${t},${dValues},${fValues}`)
                }
                const content = rows.join('\n')
                const data = window.btoa(encodeURIComponent(`${head}\n${content}`).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)))
                const a = event.target
                a.href = `data:text/csv;base64,${data}`
                a.download = 'data.csv'
              }}
            >
              export
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default connect()(MutationFrequencyPanel)
