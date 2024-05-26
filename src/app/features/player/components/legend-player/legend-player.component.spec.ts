import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendPlayerComponent } from './legend-player.component';

describe('LegendPlayerComponent', () => {
  let component: LegendPlayerComponent;
  let fixture: ComponentFixture<LegendPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegendPlayerComponent]
    });
    fixture = TestBed.createComponent(LegendPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
