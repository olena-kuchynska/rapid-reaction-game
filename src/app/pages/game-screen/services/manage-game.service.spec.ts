import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

import { ManageGameService } from './manage-game.service';
import { BOARD_ELEMENTS_COUNT, WIN_SCORE } from '@core/constants/default-values';

describe('ManageGameService', () => {
  let service: ManageGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageGameService, BsModalService]
    });
    service = TestBed.inject(ManageGameService);
  });

  afterEach(() => {
    (<any>service).resetGame();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create board elements', () => {
    const service = TestBed.inject(ManageGameService);

    service.createBoardElements();

    service.boardElements$.subscribe(elements => {
      expect(elements.length).toBe(BOARD_ELEMENTS_COUNT);
      elements.forEach(element => {
        expect(element.isActive).toBe(false);
        expect(element.isFailed).toBe(false);
        expect(element.isSucceed).toBe(false);
      });
    });
  });

  it('should start the game', () => {
    const spy = spyOn(<any>service, 'defineActiveElement');

    service.startGame();

    expect((<any>service).isGameStarted).toBeTrue();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset the game', fakeAsync(() => {
    const timerLimit = 5000;
    const initialElements = [
      { id: 1, isActive: true, isFailed: false, isSucceed: false },
      { id: 2, isActive: false, isFailed: true, isSucceed: false },
      { id: 3, isActive: false, isFailed: false, isSucceed: true }
    ];
    (<any>service).elements$.next(initialElements);
    (<any>service).succeedCount$.next(2);
    (<any>service).failedCount$.next(1);

    service.resetGame(timerLimit);
    tick();

    expect((<any>service).timerLimit).toBe(timerLimit);
    expect((<any>service).elements$.getValue().length).toBe(BOARD_ELEMENTS_COUNT);
    expect((<any>service).succeedCount$.getValue()).toBe(0);
    expect((<any>service).failedCount$.getValue()).toBe(0);
  }));

  it('should update element and increment succeed count when clicking on active element', fakeAsync(() => {
    const elementId = 1;
    const initialElements = [
      { id: 1, isActive: true, isFailed: false, isSucceed: false },
      { id: 2, isActive: false, isFailed: false, isSucceed: false },
      { id: 3, isActive: false, isFailed: false, isSucceed: false }
    ];
    (<any>service).elements$.next(initialElements);
    (<any>service).succeedCount$.next(0);

    service.clickOnActiveElement(elementId);
    const updatedElement = (<any>service).elements$.getValue().find((element: any) => element.id === elementId);
    flush();

    expect(updatedElement).toEqual({ id: 1, isActive: false, isFailed: false, isSucceed: true });
    expect((<any>service).succeedCount$.getValue()).toBe(1);
  }));

  it('should pause the game and show confirm modal if game is already started', () => {
    const timerLimit = 5000;
    const spyPauseGame = spyOn(<any>service, 'pauseGame');
    const spyShowConfirmModal = spyOn(<any>service, 'showConfirmModal').and.returnValue(of(true));

    (<any>service).isGameStarted = true;
    service.setUpGame(timerLimit);

    expect(spyPauseGame).toHaveBeenCalled();
    expect(spyShowConfirmModal).toHaveBeenCalledWith(timerLimit);
  });

  it('should reset the game if game is over', () => {
    const timerLimit = 5000;
    const spyResetGame = spyOn(service, 'resetGame');

    (<any>service).succeedCount$.next(WIN_SCORE);
    (<any>service).failedCount$.next(0);

    service.setUpGame(timerLimit);

    expect(spyResetGame).toHaveBeenCalledWith(timerLimit);
  });

  it('should set the timer limit if game is not started or not over', () => {
    const timerLimit = 5000;
    const spyResetGame = spyOn(service, 'resetGame');

    (<any>service).succeedCount$.next(0);
    (<any>service).failedCount$.next(0);

    service.setUpGame(timerLimit);

    expect(spyResetGame).not.toHaveBeenCalled();
    expect((<any>service).timerLimit).toBe(timerLimit);
  });

  it('should pause the game', () => {
    const spyClearTimeout = spyOn(<any>service, 'pauseGame');
    (<any>service).isGameStarted = true;

    service.checkAndPauseGame();

    expect(spyClearTimeout).toHaveBeenCalled();
  });

  it('should resume the game if it is already started', () => {
    const spyStartTimeout = spyOn(<any>service, 'startTimeout');
    (<any>service).isGameStarted = true;

    service.checkAndResumeGame();

    expect(spyStartTimeout).toHaveBeenCalled();
  });
});
