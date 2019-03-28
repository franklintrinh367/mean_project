import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JCCandidateListComponent } from './jc-candidate-list.component'

describe('JCCandidateListComponent', () => {
  let component: JCCandidateListComponent
  let fixture: ComponentFixture<JCCandidateListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JCCandidateListComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JCCandidateListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
