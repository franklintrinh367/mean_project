import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CandidateEditResumeComponent } from './candidate-edit-resume.component'

describe('CandidateEditResumeComponent', () => {
  let component: CandidateEditResumeComponent
  let fixture: ComponentFixture<CandidateEditResumeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateEditResumeComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEditResumeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
