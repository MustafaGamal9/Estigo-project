import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAmainComponent } from './dashboard-amain.component';

describe('DashboardAmainComponent', () => {
  let component: DashboardAmainComponent;
  let fixture: ComponentFixture<DashboardAmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
