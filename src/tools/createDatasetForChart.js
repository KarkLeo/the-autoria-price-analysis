export const createDatasetForChartByYears = (data = {}) => {
  const dataset = []
  let allYears = {}

  for ( const key in data) {
    const {count, years} = data[key]
    dataset.push({
      price: key,
      count,
      ...years
    })

    allYears = {...allYears, ...years}
  }

  const sortedYears = Object.keys(allYears).sort((a, b) => a - b)

  return {
    data: dataset,
    scale: sortedYears
  }
}

export const createDatasetForChartByModels = (data = {}) => {
  const dataset = []
  let allModels = {}

  for ( const key in data) {
    const {count, models} = data[key]
    dataset.push({
      price: key,
      count,
      ...models
    })

    allModels = {...allModels, ...models}
  }

  return {
    data: dataset,
    scale: Object.keys(allModels)
  }
}