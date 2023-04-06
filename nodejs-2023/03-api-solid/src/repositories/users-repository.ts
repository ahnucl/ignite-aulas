import { Prisma, User } from '@prisma/client'

// O fato da minha interface depender da tipagem do prisma não seria um problema?
export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
