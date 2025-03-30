import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyVmComponent } from './phy-vm.component';

describe('PhyVmComponent', () => {
  let component: PhyVmComponent;
  let fixture: ComponentFixture<PhyVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhyVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhyVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
