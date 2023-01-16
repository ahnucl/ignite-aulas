// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g // Parenteses gera grupos que são retornados no matchAll
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) // o "?" após os parênteses indicam que o conteúdo do grupo é opcional

  return pathRegex
}