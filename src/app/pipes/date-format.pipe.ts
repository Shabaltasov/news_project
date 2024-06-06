import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  public transform(value: string): string {
    const date = new Date(value);

    const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
    const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
    const formattedMonth = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
    const formattedYear = new Intl.DateTimeFormat('en-US', yearOptions).format(date);

    const day = date.getDate();
    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    return `${formattedMonth} ${day}${daySuffix}, ${formattedYear}`;
  }

}
