import { UniqueEntityID } from './../../core/entities/value-objects/unique-entity-id';
import { Entity } from '../../core/entities/entity';
import { Optional } from '../../core/types/optional';

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}