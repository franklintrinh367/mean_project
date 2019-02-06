import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/users';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  //Find existing user's email or username
  public find(obj: String) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/find/${obj}`);
  }
  //Login
  public login(email, password): Observable<User>{
    let user = {
      email : email,
      password: password
    }
    let options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<User>(`${this.baseUrl}/login`, JSON.stringify(user), options);
  }
  //Send email verification
  public sendEmail(id: String, email : String) : Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/send/${id}&${email}`);
  }

  //Find user by Hash
  public findUserByHash(hash: String) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/findUserByHash/${hash}`);
  }
}
