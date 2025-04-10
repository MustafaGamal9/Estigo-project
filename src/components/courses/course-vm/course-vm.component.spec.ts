import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseVMComponent } from './course-vm.component';

describe('CourseVMComponent', () => {
  let component: CourseVMComponent;
  let fixture: ComponentFixture<CourseVMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseVMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseVMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
