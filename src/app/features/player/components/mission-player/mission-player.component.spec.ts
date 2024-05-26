import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPlayerComponent } from './mission-player.component';

describe('MissionPlayerComponent', () => {
  let component: MissionPlayerComponent;
  let fixture: ComponentFixture<MissionPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissionPlayerComponent]
    });
    fixture = TestBed.createComponent(MissionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
