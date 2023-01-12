import http from "node:http"; // importação de módulos nativos do node (convenção)

// CommonJS => require - Pouco usado
// ESModules => import/export - Node por padrão não suporta - adicionar type ao package.json

const server = http.createServer((req, res) => {
  return res.end('Hello World')
})

server.listen(3333)
