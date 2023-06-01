import { Optional } from './../../core/types/optional';
import { UniqueEntityID } from './../../core/entities/value-objects/unique-entity-id';
import { Entity } from '../../core/entities/entity';

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date

}

export class Answer extends Entity<AnswerProps> { 
  get content() {
    return this.props.content
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)

    return answer
  }
}