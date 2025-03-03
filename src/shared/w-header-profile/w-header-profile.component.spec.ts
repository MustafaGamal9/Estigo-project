import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WHeaderProfileComponent } from './w-header-profile.component';

describe('WHeaderProfileComponent', () => {
  let component: WHeaderProfileComponent;
  let fixture: ComponentFixture<WHeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WHeaderProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WHeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
