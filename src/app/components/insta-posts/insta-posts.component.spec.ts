import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPostsComponent } from './insta-posts.component';

describe('InstaPostsComponent', () => {
  let component: InstaPostsComponent;
  let fixture: ComponentFixture<InstaPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstaPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
