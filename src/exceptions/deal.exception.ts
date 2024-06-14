export class DealException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DealException';
  }
}
