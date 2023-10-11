export const calcAverage = (data) => {
  const sum = data.reduce((acc, item) => acc + item, 0)
  return Math.round(sum / data.length)
}

export const calcMedian = (data) => {
  const sorted = data.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[middle - 1] + sorted[middle]) / 2)
  }
  return sorted[middle]
}

export const calc1stQuartile = (data) => {
  const sorted = data.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  const firstHalf = sorted.slice(0, middle)
  return calcMedian(firstHalf)
}

export const calc3rdQuartile = (data) => {
  const sorted = data.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  const secondHalf = sorted.slice(middle)
  return calcMedian(secondHalf)
}

export const calcStandardDeviation = (data) => {
  const average = calcAverage(data)
  const squareDiffs = data.map((value) => {
    const diff = value - average
    const sqrDiff = diff * diff
    return sqrDiff
  })
  const avgSquareDiff = calcAverage(squareDiffs)
  const stdDev = Math.sqrt(avgSquareDiff)
  return Math.round(stdDev)
}
