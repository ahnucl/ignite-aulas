import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform { // Obrigatoriamente precisa ler dados e escrever dados - Comunicação entre outras duas streams
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
  
    console.log(transformed)

    callback(
      null, // Erro, enviar null significa que não houve erro
      Buffer.from(String(transformed)), // dado em si
    )
  }
}

// req => readable stream
// res => writable stream

const server = http.createServer(async (req, res) => {
  const buffers = []
  
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req // readable
  //   .pipe(new InverseNumberStream())
  //   .pipe(res) // writable
})

server.listen(3334)