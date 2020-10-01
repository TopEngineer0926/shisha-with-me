import { Pipe, PipeTransform } from '@angular/core';

/*
 * Replace newline characters with HTML <br>
 * Simpler solution: using CSS white-space: pre
 */

@Pipe({
  name: 'nlbr'
})
export class NlbrPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return value;

    return value.replace(/\n/gi, '<br>');
  }
}
