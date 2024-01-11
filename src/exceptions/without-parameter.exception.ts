import { UnprocessableEntityException } from '@nestjs/common';
export class WithoutParameterException extends UnprocessableEntityException {
  constructor(message?: string) {
    super(message || 'All data must be valid');
  }
}
