import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemVmComponent } from './chem-vm.component';

describe('ChemVmComponent', () => {
  let component: ChemVmComponent;
  let fixture: ComponentFixture<ChemVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
