import React from "react";
import {Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {createDatasetForChartByMileageAndYears} from "../../tools/createDatasetForChart";
import './Charts.css'

export const MileageByYearChart = ({ data }) => {

  const mileageByYear = createDatasetForChartByMileageAndYears(data)

  return <div className='chart--small'>
    <ResponsiveContainer width="100%" height="100%" minWidth={480} minHeight={200}>
      <ComposedChart minWidth={480} minHeight={200} data={mileageByYear}>
        <CartesianGrid strokeDasharray="1 4" stroke='#777' strokeOpacity={0.7}/>
        <XAxis dataKey="year" type='number' includeHidden domain={[`dataMin`, `dataMax`]} unit='р'/>
        <YAxis/>
        <Tooltip/>
        <Area type='natural' dataKey="range" name='Розмах пробігу' stroke="#fae100" fill="#fae100"/>
        <Line type="natural" dataKey="middle" name='Середній пробіг' stroke="#b71414"/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>
}