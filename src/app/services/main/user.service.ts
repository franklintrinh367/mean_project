import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from 'src/models/users'
import { Feedback } from '../../models/others/feedback'
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private baseUrl = 'http://localhost:3000/user'
  baseUrl = `${environment.url}/user`

  constructor(private http: HttpClient) {}

  //Find existing user's email or username
  public find(obj: String): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/find/${obj}`)
  }

  //Login
  public login(email, password): Observable<User> {
    let user = {
      inputLogin: email,
      password: password,
    }
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<User>(
      `${this.baseUrl}/login`,
      JSON.stringify(user),
      options
    )
  }
  //Send email verification
  public sendEmail(id: String, email: String): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/send/${id}&${email}`)
  }

  //Find user by Hash
  public findUserByHash(hash: String): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/findUserByHash/${hash}`)
  }

  //get all Users
  public getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  //send ResetPassword
  public sendResetPassword(user: User): Observable<User> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http.post<User>(
      `${this.baseUrl}/sendResetPassword`,
      JSON.stringify(user),
      options
    )
  }

  //change password
  public changePassword(id: String, newP: String): Observable<User> {
    console.log(id)
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<User>(
      `${this.baseUrl}/change-password`,
      JSON.stringify({ id: id, pass: newP }),
      options
    )
  }

  // Submit feedback
  submit(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<Feedback>(
      this.baseUrl + '/submit',
      feedback,
      httpOptions
    )
  }
}
