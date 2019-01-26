import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/users';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  //Find existing user
  public findUser(username: String): Observable<User>{
      return this.http.get<User>(`${this.baseUrl}/find/${username}`);
  }
  //Find existing user's email
  public findEmail(email: string) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/findEmail/${email}`);
  }
}
