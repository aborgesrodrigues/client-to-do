import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTasksComponent } from './modal-tasks.component';

describe('ModalTasksComponent', () => {
  let component: ModalTasksComponent;
  let fixture: ComponentFixture<ModalTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
