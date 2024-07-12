import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import {
  StudentProps,
  Student,
} from '@/domain/forum/enterprise/entities/student'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
