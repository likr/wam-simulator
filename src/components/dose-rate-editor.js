import React from 'react'
import * as d3 from 'd3'

const initialGraph = (xSteps) => {
  const d = new Array(xSteps)
  for (let i = 0; i < xSteps; ++i) {
    d[i] = 0
  }
  return d
}

export class DoseRateEditor extends React.Component {
  constructor () {
    super()
    this.state = {
      d: initialGraph(24)
    }
  }

  render () {
    const {
      xMax,
      yMax,
      width,
      height,
      leftMargin,
      rightMargin,
      bottomMargin,
      topMargin
    } = this.props
    const {
      d
    } = this.state

    const xStep = 24
    const yStep = 10

    const xs = []
    for (let x = 0; x < xStep; ++x) {
      xs.push(x)
    }
    const ys = []
    for (let y = 0; y < yStep; ++y) {
      ys.push(y)
    }

    const xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, width])
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0])

    return <div>
      <div className='field'>
        <div className='control'>
          <button
            className='button'
            onClick={() => {
              const size = 1200
              const dt = new Array(size)
              for (let i = 0; i < size; ++i) {
                dt[i] = 0
              }
              this.props.onChange(dt)
              this.setState({
                d: initialGraph(24)
              })
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className='svg-box'>
        <svg className='svg-box-content' viewBox={`0, 0, ${width + leftMargin + rightMargin} ${height + topMargin + bottomMargin}`}>
          <g transform={`translate(${leftMargin},${topMargin})`}>
            <g>
              {
                xs.map((x, i) => {
                  return <g key={i}>
                    {
                      ys.map((y, j) => {
                        return <rect
                          key={j}
                          style={{
                            cursor: 'pointer'
                          }}
                          x={width * i / xStep}
                          y={height * (yStep - j - 1) / yStep}
                          width={width / xStep}
                          height={height / yStep}
                          fill={j < d[i] ? '#00f' : '#fff'}
                          stroke='#000'
                          onClick={() => {
                            if (d[i] === j + 1) {
                              d[i] = 0
                            } else {
                              d[i] = j + 1
                            }
                            const size = 1200
                            const dt = new Array(size)
                            for (let i = 0; i < size; ++i) {
                              const index = Math.floor(i * d.length / size)
                              dt[i] = (d[index] / d.length) * yMax
                            }
                            this.props.onChange(dt)
                            this.setState({ d })
                          }}
                        />
                      })
                    }
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(yMax)} stroke='#000' />
              {
                yScale.ticks(10).map((v, i) => {
                  return <g key={i} transform={`translate(${xScale(0)},${yScale(v)})`}>
                    <line key={i} x1='0' y1='0' x2='-5' y2='0' stroke='#000' />
                    <text dx='-10' dy='5' textAnchor='end'>{v}</text>
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={yScale(0)} x2={xScale(xMax)} y2={yScale(0)} stroke='#000' />
              {
                xScale.ticks(12).map((v, i) => {
                  return <g key={i} transform={`translate(${xScale(v)},${yScale(0)})`}>
                    <line key={i} x1='0' y1='0' x2='0' y2='5' stroke='#000' />
                    <text dy='20' textAnchor='middle'>{v}</text>
                  </g>
                })
              }
            </g>
          </g>
        </svg>
      </div>
    </div>
  }
}
