import { HttpException, HttpStatus } from '@nestjs/common';

export class DealException extends HttpException {
  constructor(message) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = 'DealException';
  }
}
