import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionComponent } from './assessments-section.component';

describe('AssessmentsSectionComponent', () => {
  let component: AssessmentsSectionComponent;
  let fixture: ComponentFixture<AssessmentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
