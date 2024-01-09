import { UnprocessableEntityException } from '@nestjs/common';
export class CreatPlaceException extends UnprocessableEntityException {
  constructor(message?: string) {
    super(message || 'All data must be valid');
  }
}
