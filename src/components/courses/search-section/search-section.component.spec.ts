import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesSearchSectionComponent } from './search-section.component';



describe('CoursesSearchSectionComponent', () => {
  let component: CoursesSearchSectionComponent;
  let fixture: ComponentFixture<CoursesSearchSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesSearchSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesSearchSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
