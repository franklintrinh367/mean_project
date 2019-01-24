import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomepagesComponent } from './admin-homepages.component';

describe('AdminHomepagesComponent', () => {
  let component: AdminHomepagesComponent;
  let fixture: ComponentFixture<AdminHomepagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomepagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
