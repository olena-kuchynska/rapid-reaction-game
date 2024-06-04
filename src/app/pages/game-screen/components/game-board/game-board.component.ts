import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GameElement } from '@core/interfaces/basic-elements';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
  @Input() elements: GameElement[];

  @Output() clickOnActive = new EventEmitter<number>();

  clickElement({ isActive, id }: GameElement): void {
    if (isActive) {
      this.clickOnActive.emit(id);
    }
  }

  trackByFn(index: number, item: GameElement): number {
    return item.id;
  }
}
