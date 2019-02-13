import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminCompanyDetailsComponent } from './admin-company-details.component'

describe('AdminCompanyDetailsComponent', () => {
  let component: AdminCompanyDetailsComponent
  let fixture: ComponentFixture<AdminCompanyDetailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCompanyDetailsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
