import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import { Entity } from '@/core/entities/entity'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
