import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstErrPipe'
})
export class FirstErrPipePipe implements PipeTransform {

  transform(object: Object): any {
    let keys = Object.keys(object);
    if(keys && keys.length >0)
      return keys[0];
    return null;
  }

}
