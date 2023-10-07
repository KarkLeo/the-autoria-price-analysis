import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export const Chart = ({
                        data, scale, colors
                      }) => {
  return (
    <div style={{
      width: '800px',
      height: '400px',
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="price"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          {scale.map((item, index) => <Bar key={item} dataKey={item} stackId="a" fill={colors[index]}/>)}
        < /BarChart>
      </ResponsiveContainer>
    </div>
  )
}