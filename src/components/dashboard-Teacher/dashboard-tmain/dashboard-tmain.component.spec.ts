import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTmainComponent } from './dashboard-tmain.component';

describe('DashboardTmainComponent', () => {
  let component: DashboardTmainComponent;
  let fixture: ComponentFixture<DashboardTmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
