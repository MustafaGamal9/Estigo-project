import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsEstigoSectionComponent } from './what-is-estigo-section.component';

describe('WhatIsEstigoSectionComponent', () => {
  let component: WhatIsEstigoSectionComponent;
  let fixture: ComponentFixture<WhatIsEstigoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatIsEstigoSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsEstigoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
