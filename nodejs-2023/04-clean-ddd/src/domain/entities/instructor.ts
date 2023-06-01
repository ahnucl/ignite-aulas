import { UniqueEntityID } from './../../core/entities/value-objects/unique-entity-id';
import { Optional } from './../../core/types/optional';
import { Entity } from '../../core/entities/entity';

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}