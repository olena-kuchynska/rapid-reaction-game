import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { random } from 'lodash-es';
import { BsModalService } from 'ngx-bootstrap/modal';

import { GameElement } from '@core/interfaces/basic-elements';
import { BOARD_ELEMENTS_COUNT, WIN_SCORE } from '@core/constants/default-values';
import { ScoreModalComponent } from '../modals/score-modal/score-modal.component';

@Injectable()
export class ManageGameService {
  private elements$ = new BehaviorSubject<GameElement[]>([]);
  private succeedCount$ = new BehaviorSubject<number>(0);
  private failedCount$ = new BehaviorSubject<number>(0);
  private timerLimit: number;
  private timer: ReturnType<typeof setTimeout>;

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

  startGame(timerLimit: number): void {
    this.timerLimit = timerLimit;
    this.resetGame();
    this.defineActiveElement();
  }

  resetGame(): void {
    clearTimeout(this.timer);
    this.createBoardElements();
    this.succeedCount$.next(0);
    this.failedCount$.next(0);
  }

  clickOnActiveElement(elementId: number): void {
    clearTimeout(this.timer);
    this.updateElement(elementId, { isActive: false, isSucceed: true });
    this.incrementSucceedCount();
    this.defineActiveElement();
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
      return this.showFinalResults();
    }

    const randomId = this.getRandomId();
    this.updateElement(randomId, { isActive: true });

    this.timer = setTimeout(() => {
      this.updateElement(randomId, { isActive: false, isFailed: true });
      this.incrementFailedCount();
      this.defineActiveElement();
    }, this.timerLimit);
  }

  private showFinalResults(): void {
    const succeedCount = this.succeedCount$.getValue();
    const failedCount = this.failedCount$.getValue();

    this.modalService.show(ScoreModalComponent, { initialState: { succeedCount, failedCount } });
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
}
