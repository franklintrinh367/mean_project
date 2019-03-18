import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { headersToString } from 'selenium-webdriver/http'
import { Candidate } from 'src/app/models/candidates/candidate'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl: String = 'http://localhost:3000/candidate/'
  constructor(private http: HttpClient) {}

  register(candidate: Candidate): Observable<Candidate> {
    let token = localStorage.getItem('auth-token')

    return this.http.post<Candidate>(
      `${this.baseUrl}/register/${token} `,
      candidate,
      httpOptions
    )
  }

  update(candidate: Candidate): Observable<Candidate> {
    let token = localStorage.getItem('auth-token')
    return this.http.put<Candidate>(
      `${this.baseUrl}/update/${token} `,
      candidate,
      httpOptions
    )
  }
}
