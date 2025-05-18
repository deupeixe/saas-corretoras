import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSocialComponent } from './action-social.component';

describe('ActionSocialComponent', () => {
  let component: ActionSocialComponent;
  let fixture: ComponentFixture<ActionSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionSocialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
