import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePropertyDetailsComponent } from './slide-property-details.component';

describe('SlidePropertyDetailsComponent', () => {
  let component: SlidePropertyDetailsComponent;
  let fixture: ComponentFixture<SlidePropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidePropertyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidePropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
