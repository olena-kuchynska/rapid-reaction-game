import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EventEmitter } from '@angular/core';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  const onHide = new EventEmitter<unknown>();
  const bsModalMock = {
    hide: () => {
      onHide.emit();
    },
    onHide
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      providers: [MockProvider(BsModalRef, bsModalMock)]
    });
    fixture = TestBed.createComponent(ConfirmModalComponent);
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

  describe('handleRestartGame', () => {
    it('should call hide method', () => {
      const spy = spyOn(component, 'hide');

      component.handleRestartGame();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit restartGame with true value', fakeAsync(() => {
      const spy = spyOn(component.restartGame, 'emit');
      component.handleRestartGame();
      tick();

      expect(spy).toHaveBeenCalledWith(true);
    }));
  });
});
