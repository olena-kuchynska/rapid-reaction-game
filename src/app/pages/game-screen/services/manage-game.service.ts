import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, of, take, tap } from 'rxjs';
import { random } from 'lodash-es';
import { BsModalService } from 'ngx-bootstrap/modal';

import { GameElement } from '@core/interfaces/basic-elements';
import { BOARD_ELEMENTS_COUNT, WIN_SCORE } from '@core/constants/default-values';
import { ScoreModalComponent } from '../modals/score-modal/score-modal.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Injectable()
export class ManageGameService {
  private elements$ = new BehaviorSubject<GameElement[]>([]);
  private succeedCount$ = new BehaviorSubject<number>(0);
  private failedCount$ = new BehaviorSubject<number>(0);
  private timerLimit: number;
  private timer: ReturnType<typeof setTimeout>;
  private isGameStarted = false;
  private startTime: number;
  private remainingTime: number;
  private timeoutCallback: () => void;

  readonly boardElements$ = this.elements$.asObservable();
  readonly succeedScore$ = this.succeedCount$.asObservable();
  readonly failedScore$ = this.failedCount$.asObservable();

  constructor(private modalService: BsModalService) {}

  createBoardElements(): void {
    const elements = [];
    for (let i = 1; i <= BOARD_ELEMENTS_COUNT; i++) {
      elements.push({ id: i, isActive: false, isFailed: false, isSucceed: false });
    }
    this.elements$.next(elements);
  }

  startGame(): void {
    this.isGameStarted = true;
    this.defineActiveElement();
  }

  resetGame(timerLimit: number): void {
    this.timerLimit = timerLimit;
    this.clearCurrentTimeout();
    this.createBoardElements();
    this.succeedCount$.next(0);
    this.failedCount$.next(0);
  }

  clickOnActiveElement(elementId: number): void {
    this.clearCurrentTimeout();
    this.updateElement(elementId, { isActive: false, isSucceed: true });
    this.incrementSucceedCount();
    this.defineActiveElement();
  }

  setUpGame(timerLimit: number): Observable<true> | undefined {
    if (this.isGameStarted) {
      this.pauseGame();

      return this.showConfirmModal(timerLimit);
    }

    if (this.isGameOver) {
      this.resetGame(timerLimit);
    } else {
      this.timerLimit = timerLimit;
    }

    return of(true);
  }

  checkAndPauseGame(): void {
    if (this.isGameStarted) {
      this.pauseGame();
    }
  }

  checkAndResumeGame(): void {
    if (this.isGameStarted) {
      this.startTimeout();
    }
  }

  get isGameOver(): boolean {
    return this.succeedCount$.getValue() === WIN_SCORE || this.failedCount$.getValue() === WIN_SCORE;
  }

  private incrementSucceedCount(): void {
    this.succeedCount$.next(this.succeedCount$.getValue() + 1);
  }

  private incrementFailedCount(): void {
    this.failedCount$.next(this.failedCount$.getValue() + 1);
  }

  private defineActiveElement(): void {
    if (this.isGameOver) {
      this.isGameStarted = false;

      return this.showFinalResults();
    }

    const randomId = this.getRandomId();
    this.defineTimeoutParams(randomId);
    this.updateElement(randomId, { isActive: true });
    this.startTimeout();
  }

  private showFinalResults(): void {
    const succeedCount = this.succeedCount$.getValue();
    const failedCount = this.failedCount$.getValue();

    this.modalService.show(ScoreModalComponent, { initialState: { succeedCount, failedCount } });
  }

  private showConfirmModal(timerLimit: number): Observable<true> | undefined {
    const modalInstance = this.modalService.show(ConfirmModalComponent);

    return modalInstance.content?.restartGame.pipe(
      take(1),
      tap(isRestart => (isRestart ? this.resetGame(timerLimit) : this.startTimeout())),
      filter(Boolean)
    );
  }

  private getRandomId(): number {
    const availableElementIds = this.elements$
      .getValue()
      .filter(({ isFailed: isFailed, isSucceed: isSucceed }) => !isFailed && !isSucceed)
      .map(({ id }) => id);
    const randomIndex = random(0, availableElementIds.length - 1);

    return availableElementIds[randomIndex];
  }

  private updateElement(elementId: number, updatedValues: Partial<GameElement>): void {
    const updatedElements = this.elements$
      .getValue()
      .map(item => (item.id === elementId ? { ...item, ...updatedValues } : item));
    this.elements$.next(updatedElements);
  }

  private defineTimeoutParams(randomId: number): void {
    this.remainingTime = this.timerLimit;
    this.timeoutCallback = (): void => {
      this.updateElement(randomId, { isActive: false, isFailed: true });
      this.incrementFailedCount();
      this.defineActiveElement();
    };
  }

  private startTimeout(): void {
    this.startTime = new Date().getTime();
    this.timer = setTimeout(this.timeoutCallback, this.remainingTime);
  }

  private clearCurrentTimeout(): void {
    clearTimeout(this.timer);
  }

  private pauseGame(): void {
    this.remainingTime -= new Date().getTime() - this.startTime;
    this.clearCurrentTimeout();
  }
}
