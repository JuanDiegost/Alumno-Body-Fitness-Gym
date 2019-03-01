import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMedicalHistoryComponent } from './get-medical-history.component';

describe('GetMedicalHistoryComponent', () => {
  let component: GetMedicalHistoryComponent;
  let fixture: ComponentFixture<GetMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
