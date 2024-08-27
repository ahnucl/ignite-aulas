import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      author: questionDetails.author,
      title: questionDetails.title,
      content: questionDetails.content,
      slug: questionDetails.slug.value,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}

/**
 * Em REST deve-se retornar apenas os campos necessários, caso seja preciso em
 * outro momento dados em outros formatos, deve-se criar um novo presenter
 */
