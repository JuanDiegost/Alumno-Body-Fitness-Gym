import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTrainerComponent } from './dialog-edit-trainer.component';

describe('DialogEditTrainerComponent', () => {
  let component: DialogEditTrainerComponent;
  let fixture: ComponentFixture<DialogEditTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
