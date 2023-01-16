// ?query=Leo

export function extractQueryParams(query) {
  return query
    .substr(1) // remove "?"
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=')

      queryParams[key] = value

      return queryParams
    }, {})
}