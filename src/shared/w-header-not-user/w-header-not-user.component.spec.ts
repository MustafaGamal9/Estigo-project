import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WHeaderNotUserComponent } from './w-header-not-user.component';

describe('WHeaderNotUserComponent', () => {
  let component: WHeaderNotUserComponent;
  let fixture: ComponentFixture<WHeaderNotUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WHeaderNotUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WHeaderNotUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
