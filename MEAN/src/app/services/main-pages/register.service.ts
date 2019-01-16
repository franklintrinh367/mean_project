import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/users';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: String = "http://localhost:3000/api";
  constructor(private http: HttpClient) { }

  public register(username: String, email: String) : Observable<User>{
    return null;
  }
}
