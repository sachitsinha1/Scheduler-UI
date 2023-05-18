import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirOpenComponent } from './redir-open.component';

describe('RedirOpenComponent', () => {
  let component: RedirOpenComponent;
  let fixture: ComponentFixture<RedirOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
