import React from 'react'
import { MileageByYearChart } from './MileageByYearChart'
import { PriceByModelChart } from './PriceByModelChart'
import { PriceByYearChart } from './PriceByYearChart'
import { OverallDataPie } from './OverallDataPie'
import { MODE } from '../../constants'
import './Charts.css'

export const SecondCharts = ({ data, overallData, mode, colors }) => {
  return mode === MODE[3] ? null : (
    <div className='second-charts__wrap'>
      <OverallDataPie data={overallData} colors={colors} />

      {mode === MODE[0] ? (
        <PriceByYearChart data={data} />
      ) : mode === MODE[1] ? (
        <PriceByModelChart data={data} colors={colors} />
      ) : mode === MODE[2] ? (
        <MileageByYearChart data={data} />
      ) : null}
    </div>
  )
}
