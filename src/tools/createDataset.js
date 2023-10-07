export const createDataset = (data, step = 100) => data?.reduce((acc, item) => {
  const { markName, modelName, year, priceUSD } = item
  const key = Math.ceil(priceUSD/step) * step
  const keyYear = year
  const keyModel = `${markName} ${modelName}`
  if (acc[key]) {
    acc[key].count += 1

    if(acc[key]?.years[keyYear]) acc[key].years[keyYear] += 1
    else acc[key].years[keyYear] = 1

    if(acc[key]?.models[keyModel]) acc[key].models[keyModel] += 1
    else acc[key].models[keyModel] = 1
  } else {
    acc[key] = {
      count: 1,
      years: {
        [keyYear]: 1
      },
      models: {
        [keyModel]: 1
      }
    }
  }
  return acc
}, {})