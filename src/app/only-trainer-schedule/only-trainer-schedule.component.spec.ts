import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyTrainerScheduleComponent } from './only-trainer-schedule.component';

describe('OnlyTrainerScheduleComponent', () => {
  let component: OnlyTrainerScheduleComponent;
  let fixture: ComponentFixture<OnlyTrainerScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyTrainerScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyTrainerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
