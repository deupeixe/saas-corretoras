import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Action01Component } from './action-01.component';

describe('Action01Component', () => {
  let component: Action01Component;
  let fixture: ComponentFixture<Action01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Action01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Action01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
