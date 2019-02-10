import React from 'react'
import * as d3 from 'd3'
import { wam } from '../wam'

export class MutatonChart extends React.Component {
  render () {
    const {
      d,
      wamParams,
      xMax,
      yMax,
      width,
      height,
      leftMargin,
      rightMargin,
      bottomMargin,
      topMargin
    } = this.props
    const line = wam(d, wamParams)
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
    return <div className='svg-box'>
      <svg className='svg-box-content' viewBox={`0, 0, ${width + leftMargin + rightMargin} ${height + topMargin + bottomMargin}`}>
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
    </div>
  }
}