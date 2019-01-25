import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMedicalHistoryComponent } from './student-medical-history.component';

describe('StudentMedicalHistoryComponent', () => {
  let component: StudentMedicalHistoryComponent;
  let fixture: ComponentFixture<StudentMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
