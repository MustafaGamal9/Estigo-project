import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPcontentComponent } from './main-pcontent.component';

describe('MainPcontentComponent', () => {
  let component: MainPcontentComponent;
  let fixture: ComponentFixture<MainPcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
