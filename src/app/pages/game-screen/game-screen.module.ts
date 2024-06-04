import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { ApprovalsRoutingModule } from './game-screen-routing.module';
import { GameScreenComponent } from './game-screen.component';
import { ScoreModalComponent } from './modals/score-modal/score-modal.component';
import { SharedModule } from '@shared/shared.module';
import { ManageGameService } from './services/manage-game.service';

@NgModule({
  declarations: [GameScreenComponent, GameBoardComponent, GameControlsComponent, ScoreModalComponent],
  imports: [CommonModule, ApprovalsRoutingModule, FormsModule, ModalModule.forRoot(), SharedModule],
  providers: [ManageGameService]
})
export class GameScreenModule {}
