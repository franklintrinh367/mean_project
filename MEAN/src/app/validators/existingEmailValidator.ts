import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, timer, of } from "rxjs";
import { UserService } from "../services/user.service";
import { switchMap, map, take } from "rxjs/operators";

export function existingEmailValidator(userService: UserService) : AsyncValidatorFn {
    return (control:AbstractControl) : Promise<ValidationErrors | null> |
    Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(
                () =>{
                    if(!control.value)
                        return of(null)
                    return userService.findEmail(control.value).pipe(
                        map(
                            email => {return email? {emailExisting: true} : null}
                        )
                    )
                }
            )
        );
    }
}