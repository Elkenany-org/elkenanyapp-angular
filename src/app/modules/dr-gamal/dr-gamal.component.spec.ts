import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrGamalComponent } from './dr-gamal.component';

describe('DrGamalComponent', () => {
  let component: DrGamalComponent;
  let fixture: ComponentFixture<DrGamalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrGamalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrGamalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
