import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'calcNumber'
})
export class CalcNumberPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value === null) {
      return '';
    }

    return value.toLocaleString([], {maximumFractionDigits: 10}).replace(/,/g, '\'');
  }
}
