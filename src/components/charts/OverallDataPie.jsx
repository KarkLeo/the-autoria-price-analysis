import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import './Charts.css'

export const OverallDataPie = ({ data, colors }) => {
  return (
    <div className='chart--small-pie'>
      <ResponsiveContainer
        width='100%'
        height='100%'
        minHeight={240}
        minWidth={240}
      >
        <PieChart minWidth={240} minHeight={240}>
          <Pie
            data={data}
            dataKey='value'
            nameKey='key'
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={100}
            fill='#8884d8'
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.key}`} fill={colors[entry.key]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
