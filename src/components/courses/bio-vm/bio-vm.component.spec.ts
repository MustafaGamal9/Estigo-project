import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioVmComponent } from './bio-vm.component';

describe('BioVmComponent', () => {
  let component: BioVmComponent;
  let fixture: ComponentFixture<BioVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
