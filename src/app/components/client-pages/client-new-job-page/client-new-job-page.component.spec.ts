import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewJobPageComponent } from './client-new-job-page.component';

describe('ClientNewJobPageComponent', () => {
  let component: ClientNewJobPageComponent;
  let fixture: ComponentFixture<ClientNewJobPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNewJobPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
