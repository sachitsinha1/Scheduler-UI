import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSmsTemplateComponent } from './view-sms-template.component';

describe('ViewSmsTemplateComponent', () => {
  let component: ViewSmsTemplateComponent;
  let fixture: ComponentFixture<ViewSmsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSmsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
