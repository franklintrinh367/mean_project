import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of, timer} from "rxjs";
import {map,  debounceTime, delay, switchMap, debounce, take} from "rxjs/operators";
import { UserService } from "../services/user.service";

export function existingUserValidator(userService : UserService) : AsyncValidatorFn {
    return (control: AbstractControl) : Promise<ValidationErrors | null> | 
    Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => {
                if(!control.value) {
                    return of(null)
                }
                return userService.findUser(control.value).pipe(
                    map(user => { 
                        return user ? {existed : true} : null})
                )
            })
        );
    }
}