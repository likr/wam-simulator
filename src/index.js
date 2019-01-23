import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as d3 from 'd3'

class DoseRateEditor extends React.Component {
  constructor () {
    super()
    const xSteps = 24
    const d = new Array(xSteps)
    for (let i = 0; i < xSteps; ++i) {
      d[i] = 0
    }
    this.state = { d }
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

    return <svg ref='svg' width={width + leftMargin + rightMargin} height={height + topMargin + bottomMargin}>
      <g transform={`translate(${leftMargin},${topMargin})`}>
        <g>
          {
            xs.map((x, i) => {
              return <g>
                {
                  ys.map((y, j) => {
                    return <rect
                      x={width * i / xStep}
                      y={height * (yStep - j - 1) / yStep}
                      width={width / xStep}
                      height={height / yStep}
                      fill={j < d[i] ? '#00f' : '#fff'}
                      stroke='#000'
                      onClick={() => {
                        d[i] = j + 1
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
  }
}

class MutatonChart extends React.Component {
  render () {
    const {
      line,
      xMax,
      yMax,
      width,
      height,
      leftMargin,
      rightMargin,
      bottomMargin,
      topMargin
    } = this.props
    const xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, width])
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0])
    const path = d3.path()
    path.moveTo(xScale(0), yScale(line[0]))
    for (let i = 1; i < xMax; ++i) {
      path.lineTo(xScale(i), yScale(line[i]))
    }
    return <svg width={width + leftMargin + rightMargin} height={height + topMargin + bottomMargin}>
      <g transform={`translate(${leftMargin},${topMargin})`}>
        <g>
          <path d={path.toString()} fill='none' stroke='#00f' />
        </g>
        <g>
          <line x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(yMax)} stroke='#000' />
          {
            yScale.ticks(10).map((v, i) => {
              return <g key={i} transform={`translate(${xScale(0)},${yScale(v)})`}>
                <line key={i} x1='0' y1='0' x2='-5' y2='0' stroke='#000' />
                <text dx='-10' dy='5' textAnchor='end'>{v.toFixed(5)}</text>
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
  }
}

const wam = (size, d) => {
  const a0 = 3.2e-8
  const a1 = 3.0e-5
  const b0 = 3.0e-3
  const b1 = 1.4e-1
  const Ft = new Array(size)
  Ft[0] = a0 / b0
  for (let i = 1; i < size; ++i) {
    const dFt = (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * Ft[i - 1]
    Ft[i] = Ft[i - 1] + dFt
  }
  return Ft
}

class C2 extends React.Component {
  constructor () {
    super()
    const size = 1200
    const line = new Array(size)
    for (let i = 0; i < size; ++i) {
      line[i] = 0
    }
    this.state = { line }
  }

  render () {
    const { line } = this.state
    const size = 1200
    const width = 600
    const height = 300
    const leftMargin = 100
    const rightMargin = 100
    const bottomMargin = 50
    const topMargin = 20
    const maxValue = 2e-4
    return <div>
      <div>
        <MutatonChart
          width={width}
          height={height}
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          topMargin={topMargin}
          bottomMargin={bottomMargin}
          xMax={size}
          yMax={maxValue}
          line={line}
        />
      </div>
      <div>
        <DoseRateEditor
          width={width}
          height={height}
          leftMargin={leftMargin}
          rightMargin={rightMargin}
          topMargin={topMargin}
          bottomMargin={bottomMargin}
          xMax={size}
          yMax={0.1}
          onChange={(d) => {
            const line = wam(size, d)
            this.setState({
              line
            })
          }}
        />
      </div>
    </div>
  }
}

class C1 extends React.Component {
  render () {
    const size = 1200
    const ds = [0.1, 0.02, 0.005, 0.001].map((dr) => {
      const cycles = 6
      const interval = size / cycles
      const d = new Array(size)
      for (let i = 0; i < size; ++i) {
        if ((i % interval) < interval / 2) {
          d[i] = dr
        } else {
          d[i] = 0
        }
      }
      return d
    })
    const lineColor = d3.scaleOrdinal(d3.schemeCategory10)
    const lines = ds.map((d, i) => {
      lineColor(i)
      return wam(size, d)
    })
    const leftMargin = 100
    const rightMargin = 100
    const bottomMargin = 50
    const middleMargin = 50
    const topMargin = 20
    const width = 600
    const height = 300
    const maxValue = 2e-4
    const xScale = d3.scaleLinear()
      .domain([0, size])
      .range([0, width])
    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0])
    const y2Scale = d3.scaleLinear()
      .domain([0, 0.1])
      .range([height, 0])

    return <div>
      <svg width={width + leftMargin + rightMargin} height={height * 2 + topMargin + middleMargin + bottomMargin}>
        <g transform={`translate(${leftMargin},${topMargin})`}>
          <g>
            <g>
              {
                lines.map((line, i) => {
                  const path = d3.path()
                  path.moveTo(xScale(0), yScale(line[0]))
                  for (let i = 1; i < size; ++i) {
                    path.lineTo(xScale(i), yScale(line[i]))
                  }
                  return <g key={i}>
                    <path d={path.toString()} fill='none' stroke={lineColor(i)} />
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(maxValue)} stroke='#000' />
              {
                yScale.ticks(10).map((v, i) => {
                  return <g key={i} transform={`translate(${xScale(0)},${yScale(v)})`}>
                    <line key={i} x1='0' y1='0' x2='-5' y2='0' stroke='#000' />
                    <text dx='-10' dy='5' textAnchor='end'>{v.toFixed(5)}</text>
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={yScale(0)} x2={xScale(size - 1)} y2={yScale(0)} stroke='#000' />
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
          <g transform={`translate(0,${height + middleMargin})`}>
            <g>
              {
                ds.map((line, i) => {
                  const path = d3.path()
                  path.moveTo(xScale(0), y2Scale(line[0]))
                  for (let i = 1; i < size; ++i) {
                    path.lineTo(xScale(i), y2Scale(line[i]))
                  }
                  return <g key={i}>
                    <path d={path.toString()} fill='none' stroke={lineColor(i)} />
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(maxValue)} stroke='#000' />
              {
                y2Scale.ticks(10).map((v, i) => {
                  return <g key={i} transform={`translate(${xScale(0)},${y2Scale(v)})`}>
                    <line key={i} x1='0' y1='0' x2='-5' y2='0' stroke='#000' />
                    <text dx='-10' dy='5' textAnchor='end'>{v}</text>
                  </g>
                })
              }
            </g>
            <g>
              <line x1={xScale(0)} y1={y2Scale(0)} x2={xScale(size - 1)} y2={y2Scale(0)} stroke='#000' />
              {
                xScale.ticks(12).map((v, i) => {
                  return <g key={i} transform={`translate(${xScale(v)},${y2Scale(0)})`}>
                    <line key={i} x1='0' y1='0' x2='0' y2='5' stroke='#000' />
                    <text dy='20' textAnchor='middle'>{v}</text>
                  </g>
                })
              }
            </g>
          </g>
        </g>
      </svg>
    </div>
  }
}

const Index = () => {
  return <div>
    <C1 />
    <C2 />
  </div>
}

const App = () => {
  return <Router>
    <div>
      <Route path='/' component={Index} exact />
    </div>
  </Router>
}

render(<App />, document.getElementById('content'))
