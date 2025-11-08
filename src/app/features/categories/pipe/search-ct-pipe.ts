import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCt'
})
export class SearchCtPipe implements PipeTransform {

   transform(arr:any[], kelma:string): any[] {
    return arr.filter((item)=>item.name.toUpperCase().includes(kelma.toUpperCase()));
  }

}
