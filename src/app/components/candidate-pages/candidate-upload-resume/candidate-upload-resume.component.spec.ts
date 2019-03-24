import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CandidateUploadResumeComponent } from './candidate-upload-resume.component'

describe('CandidateUploadResumeComponent', () => {
  let component: CandidateUploadResumeComponent
  let fixture: ComponentFixture<CandidateUploadResumeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateUploadResumeComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateUploadResumeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
