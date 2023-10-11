import React from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {
  createDatasetForChartByTransmissionType
} from "../../tools/createDatasetForChart";
import {generateRandomColors} from "../../tools/colorGenerator";
import './Charts.css'

export const TransmissionTypeByCountPie = ({data}) => {

  const transmissionTypeByCount = createDatasetForChartByTransmissionType(data)
  const transmissionTypeByCountColors = generateRandomColors(transmissionTypeByCount.length)

  return <div className='chart__wrap'>
    <h3 className='chart__title'>Трансмісія</h3>
    <p className='chart__description'>
      Порівняння кількості автомобілів за типом трансмісії
    </p>
    <div className='chart__diagram'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie data={transmissionTypeByCount} dataKey="value" nameKey='key' cx="50%" cy="50%" innerRadius={60}
               outerRadius={100}
               fill="#8884d8">
            {transmissionTypeByCount.map((entry, index) => (
              <Cell key={`cell-${entry.key}`} fill={transmissionTypeByCountColors[index]}/>
            ))}
          </Pie>
          <Tooltip/>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
}