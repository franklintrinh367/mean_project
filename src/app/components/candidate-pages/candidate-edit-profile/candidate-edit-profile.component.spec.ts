import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CandidateEditProfileComponent } from './candidate-edit-profile.component'

describe('CandidateEditProfileComponent', () => {
  let component: CandidateEditProfileComponent
  let fixture: ComponentFixture<CandidateEditProfileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateEditProfileComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEditProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
