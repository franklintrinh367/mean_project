import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CandidateRegisterPageComponent } from './candidate-register-page.component'

describe('CandidateRegisterPageComponent', () => {
  let component: CandidateRegisterPageComponent
  let fixture: ComponentFixture<CandidateRegisterPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateRegisterPageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRegisterPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
