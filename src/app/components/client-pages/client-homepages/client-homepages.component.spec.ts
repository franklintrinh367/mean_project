import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHomepagesComponent } from './client-homepages.component';

describe('ClientHomepagesComponent', () => {
  let component: ClientHomepagesComponent;
  let fixture: ComponentFixture<ClientHomepagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientHomepagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHomepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
