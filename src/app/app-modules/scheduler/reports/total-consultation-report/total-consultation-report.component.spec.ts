import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalConsultationReportComponent } from './total-consultation-report.component';

describe('TotalConsultationReportComponent', () => {
  let component: TotalConsultationReportComponent;
  let fixture: ComponentFixture<TotalConsultationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalConsultationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalConsultationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
