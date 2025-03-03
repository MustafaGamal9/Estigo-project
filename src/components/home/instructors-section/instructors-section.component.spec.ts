import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsSectionComponent } from './instructors-section.component';

describe('InstructorsSectionComponent', () => {
  let component: InstructorsSectionComponent;
  let fixture: ComponentFixture<InstructorsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
