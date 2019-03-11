import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CandidateHomePageComponent } from './candidate-home-page.component'

describe('CandidateHomePageComponent', () => {
  let component: CandidateHomePageComponent
  let fixture: ComponentFixture<CandidateHomePageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateHomePageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateHomePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
