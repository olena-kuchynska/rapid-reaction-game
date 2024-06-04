import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { DEFAULT_TIMER_LIMIT, MIN_TIMER_VALUE } from '@core/constants/default-values';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControlsComponent {
  @Output() startGameEvent = new EventEmitter<number>();

  timerLimit = DEFAULT_TIMER_LIMIT;

  readonly minTimerValue = MIN_TIMER_VALUE;

  startGame(): void {
    this.startGameEvent.emit(this.timerLimit);
  }
}
