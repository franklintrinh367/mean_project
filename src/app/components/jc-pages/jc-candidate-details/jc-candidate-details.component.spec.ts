import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JcCandidateDetailsComponent } from './jc-candidate-details.component'

describe('JcCandidateDetailsComponent', () => {
  let component: JcCandidateDetailsComponent
  let fixture: ComponentFixture<JcCandidateDetailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JcCandidateDetailsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JcCandidateDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
