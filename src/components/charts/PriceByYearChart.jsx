import React from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { createDatasetForChartByYearsAndPriceRange } from '../../tools/createDatasetForChart'
import './Charts.css'

export const PriceByYearChart = ({ data }) => {
  const priceByYear = createDatasetForChartByYearsAndPriceRange(data)

  return (
    <div className='chart--small'>
      <ResponsiveContainer
        width='100%'
        height='100%'
        minWidth={480}
        minHeight={200}
      >
        <ComposedChart minWidth={480} minHeight={200} data={priceByYear}>
          <CartesianGrid
            strokeDasharray='1 4'
            stroke='#777'
            strokeOpacity={0.7}
          />
          <XAxis
            dataKey='year'
            type='number'
            unit='р'
            includeHidden
            domain={[`dataMin`, `dataMax`]}
            tickCount={priceByYear.length}
          />
          <YAxis unit='$' />
          <Tooltip />
          <Area
            type='natural'
            dataKey='range'
            name='Розмах ціни'
            stroke='#fae100'
            fill='#fae100'
          />
          <Line
            type='natural'
            dataKey='middle'
            name='Середня ціна'
            stroke='#b71414'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
