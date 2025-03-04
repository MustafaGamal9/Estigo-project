import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizziesComponent } from './quizzies.component';

describe('QuizziesComponent', () => {
  let component: QuizziesComponent;
  let fixture: ComponentFixture<QuizziesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizziesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizziesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
