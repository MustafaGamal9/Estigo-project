import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAcontentComponent } from './main-acontent.component';

describe('MainAcontentComponent', () => {
  let component: MainAcontentComponent;
  let fixture: ComponentFixture<MainAcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
