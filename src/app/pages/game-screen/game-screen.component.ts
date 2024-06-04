import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ManageGameService } from './services/manage-game.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameScreenComponent implements OnInit {
  readonly elements$ = this.manageGameService.boardElements$;
  readonly succeedCount$ = this.manageGameService.succeedScore$;
  readonly failedCount$ = this.manageGameService.failedScore$;

  constructor(private manageGameService: ManageGameService) {}

  ngOnInit(): void {
    this.manageGameService.createBoardElements();
  }

  startGame(speedLimit: number): void {
    this.manageGameService.startGame(speedLimit);
  }

  clickOnActive(elementId: number): void {
    this.manageGameService.clickOnActiveElement(elementId);
  }
}
