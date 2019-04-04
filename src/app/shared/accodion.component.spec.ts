import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccodionComponent } from './accodion.component';

describe('AccodionComponent', () => {
  let component: AccodionComponent;
  let fixture: ComponentFixture<AccodionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccodionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccodionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
