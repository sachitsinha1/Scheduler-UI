import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MystaffComponent } from './mystaff.component';

describe('MystaffComponent', () => {
  let component: MystaffComponent;
  let fixture: ComponentFixture<MystaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
