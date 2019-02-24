import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRootComponent } from './trainer-root.component';

describe('TrainerRootComponent', () => {
  let component: TrainerRootComponent;
  let fixture: ComponentFixture<TrainerRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
