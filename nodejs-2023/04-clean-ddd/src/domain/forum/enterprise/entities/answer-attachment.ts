import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import { Entity } from '@/core/entities/entity'

interface AnswerAttachmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id)

    return attachment
  }
}
