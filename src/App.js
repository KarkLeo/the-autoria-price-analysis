import {useMemo, useState} from "react";

import {createDataset} from "./tools/createDataset";
import {createDatasetForChartByModels, createDatasetForChartByYears} from "./tools/createDatasetForChart";
import {generateGradient, generateRandomColors} from "./tools/colorGenerator";
import {Loader} from "./components/Loader";
import {Chart} from "./components/Chart";
import {LoadingButton} from "./components/LoadingButton";
import {useLocation} from "./hooks/useLocation";
import {MODE, STEPS} from "./constants";
import {useFetchCars} from "./hooks/useFetchCars";
import './App.css';
import {HeadToolset} from "./components/HeadToolset";


function App() {
  const url = useLocation()
  const [cars, setCars] = useState([])
  const [mode, setMode] = useState(MODE[0])
  const [step, setStep] = useState(STEPS[0])
  const [loading, setLoading] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  const fetchCarsHandler = useFetchCars(url, setCars, setLoading, setLoadedCount)
  const dataset =  useMemo(() => createDataset(cars, step), [cars, step])

  const {
    data,
    scale
  } = mode === MODE[0]
    ? createDatasetForChartByYears(dataset)
    : createDatasetForChartByModels(dataset)

  const colors = mode === MODE[0]
    ? generateGradient("#b71414", "#fae100", scale.length)
    : generateRandomColors(scale.length);

  const isCanViewChart = !loading && cars.length > 0
  const isCanViewHeadToolset = !loading && cars.length > 0
  const isCanViewLoadingButton = !loading && cars.length === 0 && url
  const isHelpText = !loading && cars.length === 0

  return (
    <div className="App">
      {!url && <p className='message'>Плагін оптимізований для пошуку на сайті <a href="https://auto.ria.com/uk/">Auto.RIA</a>.</p>}

      {isCanViewHeadToolset && <HeadToolset
        mode={mode} setMode={setMode}
        step={step} setStep={setStep}
        fetchCars={fetchCarsHandler}/>}

      {isCanViewChart && <Chart data={data} colors={colors} scale={scale}/>}
      {isHelpText && <p className='message'>Щоб користуватися аналітикою, перейдіть на сторінку пошуку, встановіть потрібні фільтри, а потім натисніть кнопку завантаження.</p>}
      {isCanViewLoadingButton && <LoadingButton onClick={fetchCarsHandler} disabled={loading}/>}
      <Loader loading={loading} counter={loadedCount}/>
    </div>
  )
    ;
}

export default App;
