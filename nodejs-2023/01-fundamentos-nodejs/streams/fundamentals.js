// Streams ->

// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null) // Não tem mais informações para serem enviadas por essa stream
      } else {
        const buffer = Buffer.from(String(i))
        
        this.push(buffer)
      }
    }, 1000)

  }
}

class InverseNumberStream extends Transform { // Obrigatoriamente precisa ler dados e escrever dados - Comunicação entre outras duas streams
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    
    callback(
      null, // Erro, enviar null significa que não houve erro
      Buffer.from(String(transformed)), // dado em si
    )
  }
}

class MultiplyByTenStream extends Writable {
  _write(
    chunk, // tudo que a stream de leitura envia (stream.push)
    encoding, // codificação da informação lida
    callback, // função que a stream de escrita precisa chamar quando ela terminar de usar a informação
  ) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())