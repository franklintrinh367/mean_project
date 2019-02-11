import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegisterPageComponent } from './client-register-page.component';

describe('ClientRegisterPageComponent', () => {
  let component: ClientRegisterPageComponent;
  let fixture: ComponentFixture<ClientRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
