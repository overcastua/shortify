import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUri } from 'valid-url';

@Injectable()
export class ParseURLPipe implements PipeTransform {
  transform(value: string): string {
    if (isUri(value)) {
      return value;
    } else throw new BadRequestException(`This doesn't look like a valid uri`);
  }
}
