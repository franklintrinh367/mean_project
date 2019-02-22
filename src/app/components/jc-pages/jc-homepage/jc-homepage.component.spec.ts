import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { JcHomepageComponent } from './jc-homepage.component'

describe('JcHomepageComponent', () => {
  let component: JcHomepageComponent
  let fixture: ComponentFixture<JcHomepageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JcHomepageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JcHomepageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
