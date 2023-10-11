import React from "react";
import {FuelTypeByCountPie} from "./FuelTypeByCountPie";
import {TransmissionTypeByCountPie} from "./TransmissionTypeByCountPie";
import {EngineDisplacementByCountPie} from "./EngineDisplacementByCountPie";
import {LocationByCountPie} from "./LocationByCountPie";
import './Charts.css'

export const OtherCharts = ({data}) => {
  return <div className='other-charts__wrap'>
    <FuelTypeByCountPie data={data}/>
    <TransmissionTypeByCountPie data={data}/>
    <EngineDisplacementByCountPie data={data}/>
    <LocationByCountPie data={data}/>
  </div>
}