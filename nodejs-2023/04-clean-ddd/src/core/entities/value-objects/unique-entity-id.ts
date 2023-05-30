import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  /**
   * Gerar id ou referenciar ids específicos
   */

  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {{
    this.value = value ?? randomUUID()
  }}
}