import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import {
  updateDInput
} from '../actions'

let clicked = false // XXX

const DoseChart = (props) => {
  const {
    lineIndex,
    line,
    width,
    height,
    topMargin,
    bottomMargin,
    leftMargin,
    rightMargin,
    xMax,
    yMax,
    xStep,
    yStep,
    dispatch
  } = props
  const {
    color,
    input
  } = line

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

  return <div className='svg-box' style={{ paddingTop: `${100 * (height + topMargin + bottomMargin) / (width + leftMargin + rightMargin)}%` }}>
    <svg
      className='svg-box-content'
      viewBox={`0, 0, ${width + leftMargin + rightMargin} ${height + topMargin + bottomMargin}`}
      onMouseDown={() => {
        clicked = true
      }}
      onMouseUp={() => {
        clicked = false
      }}
      onMouseLeave={() => {
        clicked = false
      }}
    >
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
                      fill={j < input[i] ? color : '#fff'}
                      stroke='#000'
                      onClick={() => {
                        dispatch(updateDInput({ lineIndex, i, j }))
                      }}
                      onMouseMove={() => {
                        if (clicked) {
                          if (j !== input[i] - 1) {
                            dispatch(updateDInput({ lineIndex, i, j }))
                          }
                        }
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
                <text dx='-10' dy='5' textAnchor='end'>{v.toFixed(2)}</text>
              </g>
            })
          }
          <text transform={`translate(-90,${height / 2})rotate(-90)`} textAnchor='middle'>Dose rate (Gy / hour)</text>
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
          <text transform={`translate(${width / 2},${height + 40})`} textAnchor='middle'>Time (hour)</text>
        </g>
      </g>
    </svg>
  </div>
}

export default connect()(DoseChart)
