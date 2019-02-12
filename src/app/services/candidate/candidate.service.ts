import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Candidate } from '../../models/candidates/candidate'
import { headersToString } from 'selenium-webdriver/http'

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
    return this.http.post<Candidate>(
      this.baseUrl + 'register',
      candidate,
      httpOptions
    )
  }
}
