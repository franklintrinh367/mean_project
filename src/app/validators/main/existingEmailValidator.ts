import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms'
import { Observable, timer, of } from 'rxjs'
import { UserService } from '../../services/main/user.service'
import { switchMap, map } from 'rxjs/operators'

export function existingEmailValidator(
  userService: UserService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => {
        if (!control.value) return of(null)
        return userService.find(control.value).pipe(
          map(email => {
            return email ? { emailExisting: true } : null
          })
        )
      })
    )
  }
}
