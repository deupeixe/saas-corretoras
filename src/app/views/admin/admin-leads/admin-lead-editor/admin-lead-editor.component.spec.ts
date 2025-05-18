import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeadEditorComponent } from './admin-lead-editor.component';

describe('AdminLeadEditorComponent', () => {
  let component: AdminLeadEditorComponent;
  let fixture: ComponentFixture<AdminLeadEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeadEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
