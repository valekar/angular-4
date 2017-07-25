import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaLatestSummaryComponent } from './sla-latest-summary.component';

describe('SlaLatestSummaryComponent', () => {
  let component: SlaLatestSummaryComponent;
  let fixture: ComponentFixture<SlaLatestSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaLatestSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaLatestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
