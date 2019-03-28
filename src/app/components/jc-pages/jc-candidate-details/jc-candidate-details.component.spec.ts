import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JCCandidateDetailsComponent } from './jc-candidate-details.component'

describe('JCCandidateDetailsComponent', () => {
  let component: JCCandidateDetailsComponent
  let fixture: ComponentFixture<JCCandidateDetailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JCCandidateDetailsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JCCandidateDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
