export class DomainCreationFailedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainCreationFailedError'
  }
}
