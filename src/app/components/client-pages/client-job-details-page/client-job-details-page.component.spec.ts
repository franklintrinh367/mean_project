import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobDetailsPageComponent } from './client-job-details-page.component';

describe('ClientJobDetailsPageComponent', () => {
  let component: ClientJobDetailsPageComponent;
  let fixture: ComponentFixture<ClientJobDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientJobDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientJobDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
