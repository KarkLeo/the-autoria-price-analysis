import React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend, ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import './Charts.css'

export const MainChart = ({
                        data, scale, colors,
                        average = null,
                        median = null,
                        min = null,
                        max = null,
                        quartile1 = null,
                        quartile3 = null
                      }) => {
  return (
    <div className='main-chart__wrap'>
      <ResponsiveContainer width="100%" height="100%" minWidth={760} minHeight={400}>
        <ComposedChart minWidth={760} minHeight={400}
          data={data.map(i => ({...i, price: parseInt(i.price)}))}
          margin={{
            top: 20,
            right: 30,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 4" stroke='#777' strokeOpacity={0.7}/>
          <XAxis dataKey="price" type='number' unit='$' includeHidden domain={[`dataMin`, `dataMax`]}/>
          <YAxis/>
          <Tooltip/>
          <Legend/>

          {/* Average and standard deviation */}
          {average && <ReferenceLine x={average} strokeOpacity={0.7} stroke="#b71414"/>}
          {min && <ReferenceLine x={min} strokeOpacity={0.7} stroke="#b71414" strokeDasharray="3 3"/>}
          {max && <ReferenceLine x={max} strokeOpacity={0.7} stroke="#b71414" strokeDasharray="3 3"/>}

          {/* Quartiles */}
          {median && <ReferenceLine x={median} strokeOpacity={0.7} stroke="#fae100"/>}
          {quartile1 && <ReferenceLine x={quartile1} strokeOpacity={0.7} stroke="#fae100" strokeDasharray="3 3"/>}
          {quartile3 && <ReferenceLine x={quartile3} strokeOpacity={0.7} stroke="#fae100" strokeDasharray="3 3"/>}


          {/* Shadow chart of price */}
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#866631" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#866631" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area type="basis" dataKey="count" dot={false} label={false} name={'Розподіл цін'}
                stroke="#866631" strokeOpacity={0.5} fillOpacity={0.5} fill="url(#colorCount)"/>

          {/* Bars */}
          {scale.map((item, index) => <Bar key={item} dataKey={item} stackId="a" fill={colors[index]}/>)}

        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
