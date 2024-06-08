import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { ManageGameService } from './services/manage-game.service';
import { CountdownComponent } from '@shared/components/countdown/countdown.component';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameScreenComponent implements OnInit {
  @ViewChild(CountdownComponent) countdownComponent: CountdownComponent;

  @HostListener('window:focus')
  focusWindowHandler(): void {
    this.manageGameService.checkAndResumeGame();
  }
  @HostListener('window:blur')
  blurWindowHandler(): void {
    this.manageGameService.checkAndPauseGame();
  }

  readonly elements$ = this.manageGameService.boardElements$;
  readonly succeedCount$ = this.manageGameService.succeedScore$;
  readonly failedCount$ = this.manageGameService.failedScore$;

  constructor(private manageGameService: ManageGameService) {}

  ngOnInit(): void {
    this.manageGameService.createBoardElements();
  }

  setUpGame(timerLimit: number): void {
    this.manageGameService.setUpGame(timerLimit)?.subscribe(() => this.countdownComponent.startCountdown());
  }

  startGame(): void {
    this.manageGameService.startGame();
  }

  clickOnActive(elementId: number): void {
    this.manageGameService.clickOnActiveElement(elementId);
  }
}
