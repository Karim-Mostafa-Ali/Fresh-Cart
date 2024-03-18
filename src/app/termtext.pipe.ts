import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
})
export class TermtextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.split(' ').slice(0, limit).join(' ');
  }
}
