export default class CustomError extends Error {
  constructor(readonly name: string, readonly message: string) {
    super(message);
  }
}
