import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, finalize, map, takeWhile, timer } from 'rxjs';

import { COUNTDOWN_INTERVAL, START_COUNTDOWN_VALUE } from '@core/constants/default-values';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {
  @Input() startValue = START_COUNTDOWN_VALUE;
  @Output() countdownFinished = new EventEmitter<void>();

  counter$: Observable<number> | null;

  startCountdown(): void {
    this.counter$ = timer(0, COUNTDOWN_INTERVAL).pipe(
      map(index => this.startValue - index),
      takeWhile(Boolean, true),
      finalize(() => {
        this.counter$ = null;
        this.countdownFinished.emit();
      })
    );
  }
}
