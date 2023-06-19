// Error
export class Left<L> {
  readonly reason: L

  constructor(reason: L) {
    this.reason = reason
  }
}

// Success
export class Right<R> {
  readonly reason: R

  constructor(reason: R) {
    this.reason = reason
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(reason: L): Either<L, R> => {
  return new Left(reason)
}

export const right = <L, R>(reason: R): Either<L, R> => {
  return new Right(reason)
}
