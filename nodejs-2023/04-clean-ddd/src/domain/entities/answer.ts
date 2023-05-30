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
}