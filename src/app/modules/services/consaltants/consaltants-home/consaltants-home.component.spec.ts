import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsaltantsHomeComponent } from './consaltants-home.component';

describe('ConsaltantsHomeComponent', () => {
  let component: ConsaltantsHomeComponent;
  let fixture: ComponentFixture<ConsaltantsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsaltantsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsaltantsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
