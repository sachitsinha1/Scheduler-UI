import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefComplaintReportComponent } from './chief-complaint-report.component';

describe('ChiefComplaintReportComponent', () => {
  let component: ChiefComplaintReportComponent;
  let fixture: ComponentFixture<ChiefComplaintReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefComplaintReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefComplaintReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
