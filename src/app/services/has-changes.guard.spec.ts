import { TestBed, async, inject } from '@angular/core/testing'

import { HasChangesGuard } from './has-changes.guard'

describe('HasChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasChangesGuard],
    })
  })

  it('should ...', inject([HasChangesGuard], (guard: HasChangesGuard) => {
    expect(guard).toBeTruthy()
  }))
})
