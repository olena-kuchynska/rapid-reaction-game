import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ScoreModalComponent } from './score-modal.component';

describe('ScoreModalComponent', () => {
  let component: ScoreModalComponent;
  let fixture: ComponentFixture<ScoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
