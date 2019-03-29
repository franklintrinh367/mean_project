import { TestBed, async, inject } from '@angular/core/testing'

import { CandidateAuthGuardGuard } from './candidate-auth-guard.guard'

describe('CandidateAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateAuthGuardGuard],
    })
  })

  it('should ...', inject(
    [CandidateAuthGuardGuard],
    (guard: CandidateAuthGuardGuard) => {
      expect(guard).toBeTruthy()
    }
  ))
})
