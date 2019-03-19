import { TestBed } from '@angular/core/testing'

import { CandidateAuthService } from './candidate-auth.service'

describe('CandidateAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: CandidateAuthService = TestBed.get(CandidateAuthService)
    expect(service).toBeTruthy()
  })
})
