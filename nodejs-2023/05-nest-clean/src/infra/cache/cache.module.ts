import { Module } from '@nestjs/common'
import { RedisService } from '../database/redis/redis.service'
import { EnvModule } from '../env/env.module'
import { CacheRepository } from './cache-repository'
import { RedisCacheRepository } from './redis/redis-cache-repository'
import { EnvService } from '../env/env.service'

@Module({
  imports: [EnvModule],
  providers: [
    EnvService,
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
