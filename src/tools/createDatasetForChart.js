export const createDatasetForChartByYears = (data = {}) => {
  const dataset = []
  let allYears = {}
  let overallYearsDataset = {}

  for (const key in data) {
    const {count, years} = data[key]
    dataset.push({
      price: key,
      count,
      ...years
    })

    allYears = {...allYears, ...years}

    for (const year in years) {
      if (overallYearsDataset[year]) {
        overallYearsDataset[year] += years[year]
      } else {
        overallYearsDataset[year] = years[year]
      }
    }
  }

  const sortedYears = Object.keys(allYears).sort((a, b) => a - b)
  const overallYears = Object.entries(overallYearsDataset)
    .map(([key, value]) => ({key, value}))
    .sort((a, b) => a.key - b.key)

  return {
    data: dataset,
    scale: sortedYears,
    overallData: overallYears
  }
}

export const createDatasetForChartByModels = (data = {}) => {
  const dataset = []
  let allModels = {}
  let overallModelsDataset = {}

  for (const key in data) {
    const {count, models} = data[key]
    dataset.push({
      price: key,
      count,
      ...models
    })

    allModels = {...allModels, ...models}

    for (const model in models) {
      if (overallModelsDataset[model]) {
        overallModelsDataset[model] += models[model]
      } else {
        overallModelsDataset[model] = models[model]
      }
    }
  }

  const overallModels = Object.entries(overallModelsDataset)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({key, value}))

  return {
    data: dataset,
    scale: Object.keys(allModels),
    overallData: overallModels
  }
}

export const createDatasetForChartByMileage = (data = {}) => {
  const dataset = []
  let allMileage = {}
  let overallMileageDataset = {}

  for (const key in data) {
    const {count, mileage} = data[key]
    dataset.push({
      price: key,
      count,
      ...mileage
    })

    allMileage = {...allMileage, ...mileage}

    for (const item in mileage) {
      if (overallMileageDataset[item]) {
        overallMileageDataset[item] += mileage[item]
      } else {
        overallMileageDataset[item] = mileage[item]
      }
    }
  }

  const sortedMileage = Object.keys(allMileage).sort((a, b) => a - b)
  const overallMileage = Object.entries(overallMileageDataset)
    .map(([key, value]) => ({key, value}))
    .sort((a, b) => a.key - b.key)

  return {
    data: dataset,
    scale: sortedMileage,
    overallData: overallMileage
  }
}


export const createDatasetForChartByYearsAndPriceRange = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {year, priceUSD} = item

    if (acc[year]) {
      acc[year].middle = Math.round((acc[year].middle + priceUSD) / 2)
      acc[year].min = Math.min(acc[year].min, priceUSD)
      acc[year].max = Math.max(acc[year].max, priceUSD)
    } else {
      acc[year] = {
        middle: priceUSD,
        min: priceUSD,
        max: priceUSD
      }
    }
    return acc
  }, {})

  return Object.entries(dataset).map(([key, value]) => ({
    year: parseInt(key),
    middle: value.middle,
    range: [value.min, value.max]
  }))
}

export const createDatasetForChartByModelsAndPriceRange = (data = []) => {

  const dataset = data.reduce((acc, item) => {

    const {markName, modelName, priceUSD} = item
    const keyModel = `${markName} ${modelName}`

    if (acc[keyModel]) {
      acc[keyModel].middle = Math.round((acc[keyModel].middle + priceUSD) / 2)
      acc[keyModel].min = Math.min(acc[keyModel].min, priceUSD)
      acc[keyModel].max = Math.max(acc[keyModel].max, priceUSD)
      acc[keyModel].count += 1
    } else {
      acc[keyModel] = {
        middle: priceUSD,
        min: priceUSD,
        max: priceUSD,
        count: 1
      }
    }

    return acc
  }, {})

  return Object.entries(dataset)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([key, value]) => ({model: key, middle: value.middle, range: [value.min, value.max], count: value.count}))
}

export const createDatasetForChartByMileageAndYears = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {year, mileage} = item

    if (acc[year]) {
      acc[year].middle = Math.round((acc[year].middle + mileage) / 2)
      acc[year].min = Math.min(acc[year].min, mileage)
      acc[year].max = Math.max(acc[year].max, mileage)
    } else {
      acc[year] = {
        middle: mileage,
        min: mileage,
        max: mileage
      }
    }
    return acc
  }, {})

  return Object.entries(dataset)
    .sort((a, b) => a[0] - b[0])
    .map(([key, value]) => ({year: parseInt(key), middle: value.middle, range: [value.min, value.max]}))
}

export const createDatasetForChartByFuelType = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {fuelType} = item

    if (!fuelType || fuelType === 'null') return acc

    if (acc[fuelType]) {
      acc[fuelType] += 1
    } else {
      acc[fuelType] = 1
    }

    return acc
  }, {})

  return Object.entries(dataset)
    .map(([key, value]) => ({key, value}))
}

export const createDatasetForChartByEngineDisplacement = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {engineDisplacement} = item

    if (!engineDisplacement || engineDisplacement === 'null') return acc

    if (acc[engineDisplacement]) {
      acc[engineDisplacement] += 1
    } else {
      acc[engineDisplacement] = 1
    }

    return acc
  }, {})

  return Object.entries(dataset)
    .map(([key, value]) => ({key, value}))
    .sort((a, b) => a.key - b.key)
}

export const createDatasetForChartByLocation = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {location} = item

    if (!location || location === 'null') return acc

    if (acc[location]) {
      acc[location] += 1
    } else {
      acc[location] = 1
    }

    return acc
  }, {})

  return Object.entries(dataset)
    .map(([key, value]) => ({key, value}))
    .sort((a, b) => b.value - a.value)
}

export const createDatasetForChartByTransmissionType = (data = []) => {
  const dataset = data.reduce((acc, item) => {
    const {transmissionType} = item

    if (!transmissionType || transmissionType === 'null') return acc

    if (acc[transmissionType]) {
      acc[transmissionType] += 1
    } else {
      acc[transmissionType] = 1
    }

    return acc
  }, {})

  return Object.entries(dataset)
    .map(([key, value]) => ({key, value}))
}