import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProgressComponent } from './dialog-add-progress.component';

describe('DialogAddProgressComponent', () => {
  let component: DialogAddProgressComponent;
  let fixture: ComponentFixture<DialogAddProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
