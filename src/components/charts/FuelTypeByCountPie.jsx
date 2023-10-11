import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { createDatasetForChartByFuelType } from '../../tools/createDatasetForChart'
import { generateGradient } from '../../tools/colorGenerator'
import './Charts.css'

export const FuelTypeByCountPie = ({ data }) => {
  const fuelTypeByCount = createDatasetForChartByFuelType(data)
  const fuelTypeByCountColors = generateGradient(
    '#884604',
    '#dcd808',
    fuelTypeByCount.length
  )

  return (
    <div className='chart__wrap'>
      <h3 className='chart__title'>Тип палива</h3>
      <p className='chart__description'>
        Порівняння кількості автомобілів за типом палива
      </p>
      <div className='chart__diagram'>
        <ResponsiveContainer
          width='100%'
          height='100%'
          minWidth={240}
          minHeight={240}
        >
          <PieChart minWidth={240} minHeight={240}>
            <Pie
              data={fuelTypeByCount}
              dataKey='value'
              nameKey='key'
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              fill='#8884d8'
            >
              {fuelTypeByCount.map((entry, index) => (
                <Cell
                  key={`cell-${entry.key}`}
                  fill={fuelTypeByCountColors[index]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
