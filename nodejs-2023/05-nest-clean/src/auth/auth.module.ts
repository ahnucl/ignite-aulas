import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

/**
 * Algoritmo RS256 - chave privada e chave publica
 */

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // Quando for necessário usar alguma injeção de dependência - Tem na doc
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('JWT_SECRET', { infer: true })

        return {
          secret,
        }
      },
    }),
  ],
})
export class AuthModule {}
