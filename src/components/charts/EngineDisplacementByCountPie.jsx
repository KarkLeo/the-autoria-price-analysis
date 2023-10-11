import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import React from 'react'
import { createDatasetForChartByEngineDisplacement } from '../../tools/createDatasetForChart'
import { generateGradient } from '../../tools/colorGenerator'

export const EngineDisplacementByCountPie = ({ data }) => {
  const engineDisplacementByCount =
    createDatasetForChartByEngineDisplacement(data)
  const engineDisplacementByCountColors = generateGradient(
    '#00b7ef',
    '#001d38',
    engineDisplacementByCount.length
  )

  return (
    <div className='chart__wrap'>
      <h3 className='chart__title'>Об'єм двигуна (л)</h3>
      <p className='chart__description'>
        Порівняння кількості автомобілів за об'ємом двигуна
      </p>
      <div className='chart__diagram'>
        <ResponsiveContainer
          width='100%'
          height='100%'
          minHeight={240}
          minWidth={240}
        >
          <PieChart minWidth={240} minHeight={240}>
            <Pie
              data={engineDisplacementByCount}
              dataKey='value'
              nameKey='key'
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              fill='#8884d8'
            >
              {engineDisplacementByCount.map((entry, index) => (
                <Cell
                  key={`cell-${entry.key}`}
                  fill={engineDisplacementByCountColors[index]}
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
