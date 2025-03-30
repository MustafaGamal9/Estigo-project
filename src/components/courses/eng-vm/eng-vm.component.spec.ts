import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngVmComponent } from './eng-vm.component';

describe('EngVmComponent', () => {
  let component: EngVmComponent;
  let fixture: ComponentFixture<EngVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
