import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPmainComponent } from './dashboard-pmain.component';

describe('DashboardPmainComponent', () => {
  let component: DashboardPmainComponent;
  let fixture: ComponentFixture<DashboardPmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
