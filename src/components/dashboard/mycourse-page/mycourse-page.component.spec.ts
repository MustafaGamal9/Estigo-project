import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycoursePageComponent } from './mycourse-page.component';

describe('MycoursePageComponent', () => {
  let component: MycoursePageComponent;
  let fixture: ComponentFixture<MycoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycoursePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
