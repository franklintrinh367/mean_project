import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from 'src/models/users'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // private baseUrl: String = "http://localhost:3000/user/register";
  private baseUrl: String = `${environment.url}/user/register`
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<User> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<User>(
      `${this.baseUrl}`,
      JSON.stringify(user),
      options
    )
  }
}
