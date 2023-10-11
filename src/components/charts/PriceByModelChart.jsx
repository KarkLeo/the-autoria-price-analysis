import React from "react";
import {Bar, CartesianGrid, Cell, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {createDatasetForChartByModelsAndPriceRange} from "../../tools/createDatasetForChart";
import './Charts.css'
export const PriceByModelChart = ({data, colors}) => {

  const priceByModel = createDatasetForChartByModelsAndPriceRange(data)

  return <div className='chart--small'>
    <ResponsiveContainer width="100%" height="100%" minWidth={480} minHeight={200}>
      <ComposedChart minWidth={480} minHeight={200} data={priceByModel}>
        <CartesianGrid strokeDasharray="1 4" stroke='#777' strokeOpacity={0.7}/>
        <XAxis dataKey="model" type='category'/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="range" name='Розмах ціни'>
          {
            priceByModel.map((entry) =>
              (<Cell key={`cell-${entry.model}`} fill={colors[entry.model]}/>))
          }
        </Bar>
        <Line type="step" dataKey="middle" name='Середня ціна' stroke="#b71414"/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>
}