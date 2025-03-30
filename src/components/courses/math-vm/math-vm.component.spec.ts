import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathVmComponent } from './math-vm.component';

describe('MathVmComponent', () => {
  let component: MathVmComponent;
  let fixture: ComponentFixture<MathVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
