import { TestBed } from '@angular/core/testing'

import { ClientAuthService } from './client-auth.service'

describe('ClientAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ClientAuthService = TestBed.get(ClientAuthService)
    expect(service).toBeTruthy()
  })
})
