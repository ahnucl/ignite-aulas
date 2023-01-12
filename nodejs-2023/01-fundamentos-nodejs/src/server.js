import http from "node:http"; // importação de módulos nativos do node (convenção)

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

const users = [] // Stateful

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url)

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }
  
  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Leonardo',
      email: 'leonardo@cunha.com',
      age: '33',
    })

    return res.writeHead(201).end()
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)
