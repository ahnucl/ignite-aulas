import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -15.829549085160197,
      longitude: -47.950941497841754,
      // latitude: -15.84915788030682, // 9.97 km
      // longitude: -47.962716583156414,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -15.8289563,
      longitude: -48.0505933,
    })

    const { gyms } = await sut.execute({
      userLatitude: -15.8289563,
      userLongitude: -48.0505933,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
