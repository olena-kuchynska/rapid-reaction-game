import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { finalize } from 'rxjs';

import { CountdownComponent } from './countdown.component';
import { COUNTDOWN_INTERVAL } from '@core/constants/default-values';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountdownComponent]
    });
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    component.startValue = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should countdown from start value', () => {
    let expectedCount = 3;

    component.startCountdown();

    expect(component.counter$).not.toBeNull();
    component.counter$?.subscribe(count => {
      expect(count).toBe(expectedCount);
      expectedCount--;
    });
  });

  it('should emit countdownFinished when countdown is done', fakeAsync(() => {
    const spy = spyOn(component.countdownFinished, 'emit');

    component.startCountdown();

    component.counter$
      ?.pipe(
        finalize(() => {
          expect(component.counter$).toBeNull();
          expect(spy).toHaveBeenCalled();
        })
      )
      .subscribe();
    tick((component.startValue + 1) * COUNTDOWN_INTERVAL);
  }));
});
