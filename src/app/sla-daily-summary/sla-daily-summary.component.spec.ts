import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaDailySummaryComponent } from './sla-daily-summary.component';

describe('SlaDailySummaryComponent', () => {
  let component: SlaDailySummaryComponent;
  let fixture: ComponentFixture<SlaDailySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaDailySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaDailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
