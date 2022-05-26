import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(value: string, isPlural: boolean): string {
    return isPlural ? `${value}s` : value;
  }
}
