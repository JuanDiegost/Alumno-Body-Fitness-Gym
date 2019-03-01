import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerStudentScheduleComponent } from './trainer-student-schedule.component';

describe('TrainerStudentScheduleComponent', () => {
  let component: TrainerStudentScheduleComponent;
  let fixture: ComponentFixture<TrainerStudentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerStudentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerStudentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
