import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ScoreModalComponent } from './score-modal.component';

describe('ScoreModalComponent', () => {
  let component: ScoreModalComponent;
  let fixture: ComponentFixture<ScoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreModalComponent],
      providers: [MockProvider(BsModalRef, { hide: () => {} })],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide modal', () => {
    const spy = spyOn(component.bsModalRef, 'hide');

    component.hide();

    expect(spy).toHaveBeenCalled();
  });
});
