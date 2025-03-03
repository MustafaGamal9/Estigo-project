import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsSectionComponent } from './tools-section.component';

describe('ToolsSectionComponent', () => {
  let component: ToolsSectionComponent;
  let fixture: ComponentFixture<ToolsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
