import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Feedback } from '../models/others/feedback'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private baseUrl: String = 'http://localhost:3000/feedback/'
  constructor(private http: HttpClient) {}

  submit(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(
      this.baseUrl + 'submit',
      feedback,
      httpOptions
    )
  }
}
