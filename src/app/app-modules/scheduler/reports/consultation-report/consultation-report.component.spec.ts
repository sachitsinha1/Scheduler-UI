import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationReportComponent } from './consultation-report.component';

describe('ConsultationReportComponent', () => {
  let component: ConsultationReportComponent;
  let fixture: ComponentFixture<ConsultationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
