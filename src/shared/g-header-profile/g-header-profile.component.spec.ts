import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHeaderProfileComponent } from './g-header-profile.component';

describe('GHeaderProfileComponent', () => {
  let component: GHeaderProfileComponent;
  let fixture: ComponentFixture<GHeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GHeaderProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GHeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
