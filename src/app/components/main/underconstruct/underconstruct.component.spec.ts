import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstructComponent } from './underconstruct.component';

describe('UnderconstructComponent', () => {
  let component: UnderconstructComponent;
  let fixture: ComponentFixture<UnderconstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderconstructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderconstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
