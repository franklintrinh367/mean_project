import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JCJobListComponent } from './jc-job-list.component'

describe('JcJobListComponent', () => {
  let component: JCJobListComponent
  let fixture: ComponentFixture<JCJobListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JCJobListComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JCJobListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
