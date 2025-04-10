import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTcontentComponent } from './main-tcontent.component';

describe('MainTcontentComponent', () => {
  let component: MainTcontentComponent;
  let fixture: ComponentFixture<MainTcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
