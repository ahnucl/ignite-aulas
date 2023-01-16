import http from "node:http" // importação de módulos nativos do node (convenção)
import { json } from "./middlewares/json.js" // type=module no node precisa da extensão
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

// CommonJS => require - Pouco usado
// ESModules => import/export - Node por padrão não suporta - adicionar type ao package.json

// GET, POST, PUT, PATCH, DELETE - Diferenças semânticos
// GET => Buscar um recurso do back-en
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end // Atualizar uma entidade quase que por completo
// PATCH => Atualizar uma informação específica de um recurso no back-end // Atualizar apenas uma informação
// DELETE => Deletar um recurso do back-end

// Stateful - Stateless

// JSON - Javascript Object Notation

// Cabeçalhos (Requisição/Resposta) => Metadados - informações adicionais não relacionadas ao conteúdo da resposta, que ajudam os envlvidos a interpretar a requisição

// Query Parameters  
//  - URL Statefull\
//  - parâmetros nomeados
//  - /users?userID=1&name=Leonardo
//  - informações não sensíveis que modificam a resposta do backend
//  - filtros, paginação, não-obrigatório
// Route Parameters
//  - Identificação de recurso
// Request Body
//  - Envio de informações de um formulário normalmente (HTTPs)

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  console.log(method, url)

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    // console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}


    return route.handler(req, res)
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)
