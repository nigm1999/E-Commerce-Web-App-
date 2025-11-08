import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPorductComponent } from './popular-porduct.component';

describe('PopularPorductComponent', () => {
  let component: PopularPorductComponent;
  let fixture: ComponentFixture<PopularPorductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularPorductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularPorductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
