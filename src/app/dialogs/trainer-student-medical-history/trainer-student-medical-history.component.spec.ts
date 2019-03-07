import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerStudentMedicalHistoryComponent } from './trainer-student-medical-history.component';

describe('TrainerStudentMedicalHistoryComponent', () => {
  let component: TrainerStudentMedicalHistoryComponent;
  let fixture: ComponentFixture<TrainerStudentMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerStudentMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerStudentMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
