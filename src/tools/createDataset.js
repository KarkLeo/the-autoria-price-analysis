const mileageStep = 20

export const createDataset = (data, step = 100) => data?.reduce((acc, item) => {
  const { markName, modelName, year, priceUSD, mileage} = item
  const key = Math.ceil(priceUSD/step) * step
  const keyYear = year
  const keyModel = `${markName} ${modelName}`
  const keyMileage = Math.ceil(mileage/mileageStep) * mileageStep

  if (acc[key]) {
    acc[key].count += 1

    if(acc[key]?.years[keyYear]) acc[key].years[keyYear] += 1
    else acc[key].years[keyYear] = 1

    if(acc[key]?.models[keyModel]) acc[key].models[keyModel] += 1
    else acc[key].models[keyModel] = 1

    if(mileage && acc[key]?.mileage[keyMileage]) acc[key].mileage[keyMileage] += 1
    else if (mileage) acc[key].mileage[keyMileage] = 1

  } else {
    acc[key] = {
      count: 1,
      years: {
        [keyYear]: 1
      },
      models: {
        [keyModel]: 1
      },
      mileage: {
        [keyMileage]: 1
      }
    }
  }
  return acc
}, {})