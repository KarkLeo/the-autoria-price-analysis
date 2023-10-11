export const paginateURL = (url, page) => {
  let parsedUrl = new URL(url)
  parsedUrl.searchParams.set('size', '100')
  parsedUrl.searchParams.set('page', page)

  return parsedUrl.toString()
}
