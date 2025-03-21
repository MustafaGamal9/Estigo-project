import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHeaderNotUserComponent } from './g-header-not-user.component';

describe('GHeaderNotUserComponent', () => {
  let component: GHeaderNotUserComponent;
  let fixture: ComponentFixture<GHeaderNotUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GHeaderNotUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GHeaderNotUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
