import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminJobsDetailsComponent } from './admin-jobs-details.component'

describe('AdminJobsDetailsComponent', () => {
  let component: AdminJobsDetailsComponent
  let fixture: ComponentFixture<AdminJobsDetailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminJobsDetailsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobsDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
