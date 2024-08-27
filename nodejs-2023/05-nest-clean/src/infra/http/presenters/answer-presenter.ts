import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerPresenter {
  static toHTTP(answer: Answer) {
    return {
      id: answer.id.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}

/**
 * Todo presenter é um mapper - só transformar um formato para outro
 */
