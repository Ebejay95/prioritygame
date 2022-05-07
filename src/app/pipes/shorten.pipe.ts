import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shorten'
})

export class ShortenPipe implements PipeTransform {

  /**
  * Shorten string by limit
  * @param    {string} value   any string for a view
  * @param    {number} limit   allowed letter count
  * @return   {string}         shortened string by limit
  */
  transform(value: any, limit: number): string  {
    if (value.length > limit){
        return value.substr(0,limit) + '...'
    }
    return value
  }

}
