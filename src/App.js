import React, { useMemo, useState } from 'react'

import { createDataset } from './tools/createDataset'
import {
  createDatasetForChartByMileage,
  createDatasetForChartByModels,
  createDatasetForChartByYears,
} from './tools/createDatasetForChart'
import { generateGradient, generateRandomColors } from './tools/colorGenerator'
import { Loader } from './components/Loader'
import { MainChart } from './components/charts/MainChart'
import { LoadingButton } from './components/LoadingButton'
import { useLocation } from './hooks/useLocation'
import { MODE, STEPS } from './constants'
import { useFetchCars } from './hooks/useFetchCars'
import './App.css'
import { HeadToolset } from './components/HeadToolset'
import {
  calc1stQuartile,
  calc3rdQuartile,
  calcAverage,
  calcMedian,
  calcStandardDeviation,
} from './tools/statisticsСalculator'
import { InfoBlock } from './components/InfoBlock'
import { SecondCharts } from './components/charts/SecondCharts'
import { OtherCharts } from './components/charts/OtherCharts'

function App() {
  const url = useLocation()
  const [cars, setCars] = useState([])
  const [mode, setMode] = useState(MODE[0])
  const [step, setStep] = useState(STEPS[0])
  const [loading, setLoading] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [isError, setIsError] = useState(true)

  const fetchCarsHandler = useFetchCars(
    url,
    setCars,
    setLoading,
    setLoadedCount,
    setIsError
  )
  const dataset = useMemo(() => createDataset(cars, step), [cars, step])

  const { data, scale, overallData } =
    mode === MODE[0]
      ? createDatasetForChartByYears(dataset)
      : mode === MODE[1]
      ? createDatasetForChartByModels(dataset)
      : mode === MODE[2]
      ? createDatasetForChartByMileage(dataset)
      : createDatasetForChartByYears(dataset)

  const colors =
    mode === MODE[0]
      ? generateGradient('#b71414', '#fae100', scale.length)
      : mode === MODE[1]
      ? generateRandomColors(scale.length)
      : mode === MODE[2]
      ? generateGradient('#fae100', '#b71414', scale.length)
      : generateRandomColors(scale.length)

  const colorsRecord = colors.reduce((acc, item, index) => {
    acc[scale[index]] = item
    return acc
  }, {})

  const isCanViewChart = !loading && cars.length > 0
  const isCanViewHeadToolset = !loading && cars.length > 0
  const isCanViewLoadingButton = !loading && cars.length === 0 && url
  const isHelpText = !loading && cars.length === 0

  const average = calcAverage(cars.map((item) => item.priceUSD))
  const median = calcMedian(cars.map((item) => item.priceUSD))
  const standardDeviation = calcStandardDeviation(
    cars.map((item) => item.priceUSD)
  )
  const quartile1 = calc1stQuartile(cars.map((item) => item.priceUSD))
  const quartile3 = calc3rdQuartile(cars.map((item) => item.priceUSD))

  return (
    <div className='App'>
      {!url && (
        <p className='message'>
          Плагін оптимізований для пошуку на сайті{' '}
          <a href='https://auto.ria.com/uk/' target='_blank'>
            Auto.RIA
          </a>
          .
        </p>
      )}

      {isCanViewHeadToolset && (
        <HeadToolset
          mode={mode}
          setMode={setMode}
          step={step}
          setStep={setStep}
        />
      )}

      {isCanViewChart && mode !== MODE[3] && (
        <MainChart
          data={data}
          colors={colors}
          scale={scale}
          average={average}
          median={median}
          min={average - standardDeviation}
          max={average + standardDeviation}
          quartile1={quartile1}
          quartile3={quartile3}
          step={step}
        />
      )}

      {isCanViewChart && mode !== MODE[3] && (
        <InfoBlock
          median={median}
          average={average}
          standardDeviation={standardDeviation}
          quartile1={quartile1}
          quartile3={quartile3}
        />
      )}

      {isCanViewChart && (
        <SecondCharts
          mode={mode}
          data={cars}
          overallData={overallData}
          colors={colorsRecord}
        />
      )}

      {isCanViewChart && mode === MODE[3] ? <OtherCharts data={cars} /> : null}

      {isHelpText && (
        <p className='message'>
          Щоб користуватися аналітикою, перейдіть на{' '}
          <a
            href='https://auto.ria.com/uk/advanced-search/?indexName=auto&price.currency=1&abroad.not=0&custom.not=1&size=100'
            target='_blank'
          >
            сторінку пошуку
          </a>
          , встановіть потрібні фільтри, і коли будете на сторінці видачі -
          кнопку завантаження у цьому вікні.
        </p>
      )}
      {isCanViewLoadingButton && (
        <LoadingButton onClick={fetchCarsHandler} disabled={loading} />
      )}
      <Loader loading={loading} counter={loadedCount} />
      {isCanViewLoadingButton && isError && (
        <p className='message error'>
          Помилка при завантаженні даних. Спробуйте ще раз.
        </p>
      )}
    </div>
  )
}

export default App
