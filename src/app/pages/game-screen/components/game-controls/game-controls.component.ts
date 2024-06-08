import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DEFAULT_TIMER_LIMIT, MAX_TIMER_VALUE, MIN_TIMER_VALUE } from '@core/constants/default-values';
import { ONLY_DIGITS_MASK, DEFAULT_SEPARATOR_LIMIT } from '@core/constants/text-mask';
import { boundariesValidation } from '@core/validators/boundaries-value';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControlsComponent {
  @Output() startGameEvent = new EventEmitter<number>();

  timerLimit = new FormControl<number>(DEFAULT_TIMER_LIMIT, boundariesValidation(MIN_TIMER_VALUE, MAX_TIMER_VALUE));

  readonly minTimerValue = MIN_TIMER_VALUE;
  readonly separatorLimit = DEFAULT_SEPARATOR_LIMIT;
  readonly mask = ONLY_DIGITS_MASK;

  startGame(): void {
    this.startGameEvent.emit(this.timerLimit.value);
  }
}
