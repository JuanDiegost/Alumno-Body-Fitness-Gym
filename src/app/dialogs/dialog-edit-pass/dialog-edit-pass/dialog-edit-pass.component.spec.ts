import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPassComponent } from './dialog-edit-pass.component';

describe('DialogEditPassComponent', () => {
  let component: DialogEditPassComponent;
  let fixture: ComponentFixture<DialogEditPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
