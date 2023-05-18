import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationCalanderViewComponent } from './specialization-calander-view.component';

describe('SpecializationCalanderViewComponent', () => {
  let component: SpecializationCalanderViewComponent;
  let fixture: ComponentFixture<SpecializationCalanderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationCalanderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationCalanderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
