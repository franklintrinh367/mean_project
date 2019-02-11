import { AsyncValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";
import { UserService } from "src/app/services/main/user.service";
import { Observable, timer, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

export function existingUserValidator(userService: UserService) : AsyncValidatorFn {
    return (control: AbstractControl) : Promise<ValidationErrors | null> |
    Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(
                () => {
                    return !control.value ? of(null) : 
                     userService.find(control.value).pipe(
                         map(
                         user => {return (user)? {userExisting: true} : null}
                         ) 
                     )
                }
            )
        );
    }
}