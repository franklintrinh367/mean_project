import { TestBed } from '@angular/core/testing'

import { ResetPasswordAuthService } from './reset-password-auth.service'

describe('ResetPasswordAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ResetPasswordAuthService = TestBed.get(
      ResetPasswordAuthService
    )
    expect(service).toBeTruthy()
  })
})
