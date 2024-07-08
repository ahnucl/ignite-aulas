import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string, // Não precisa passar dentro do objeto pois o próprio método indica que esse é o primeiro parâmetro
    params: PaginationParams, // o objeto se refere a paginação apenas! No momento apenas temos o número da página, mas poderíamos ter queries de busca por exemplos
  ): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
