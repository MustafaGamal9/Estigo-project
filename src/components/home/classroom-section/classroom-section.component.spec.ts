import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSectionComponent } from './classroom-section.component';

describe('ClassroomSectionComponent', () => {
  let component: ClassroomSectionComponent;
  let fixture: ComponentFixture<ClassroomSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
