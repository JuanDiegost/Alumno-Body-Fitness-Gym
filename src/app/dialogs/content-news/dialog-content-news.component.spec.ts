import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentNewsComponent } from './dialog-content-news.component';

describe('DialogContentNewsComponent', () => {
  let component: DialogContentNewsComponent;
  let fixture: ComponentFixture<DialogContentNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
