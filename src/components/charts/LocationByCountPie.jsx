import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { createDatasetForChartByLocation } from '../../tools/createDatasetForChart'
import { generateGradient } from '../../tools/colorGenerator'
import './Charts.css'

export const LocationByCountPie = ({ data }) => {
  const locationByCount = createDatasetForChartByLocation(data)
  const locationByCountColors = generateGradient(
    '#859f6a',
    '#001126',
    locationByCount.length
  )

  return (
    <div className='chart__wrap'>
      <h3 className='chart__title'>Географія</h3>
      <p className='chart__description'>
        Порівняння кількості автомобілів за містоми
      </p>
      <div className='chart__diagram'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={300} height={300}>
            <Pie
              data={locationByCount}
              dataKey='value'
              nameKey='key'
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              fill='#8884d8'
            >
              {locationByCount.map((entry, index) => (
                <Cell
                  key={`cell-${entry.key}`}
                  fill={locationByCountColors[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
