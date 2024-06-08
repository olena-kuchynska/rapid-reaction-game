import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { ApprovalsRoutingModule } from './game-screen-routing.module';
import { GameScreenComponent } from './game-screen.component';
import { ScoreModalComponent } from './modals/score-modal/score-modal.component';
import { SharedModule } from '@shared/shared.module';
import { ManageGameService } from './services/manage-game.service';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    GameScreenComponent,
    GameBoardComponent,
    GameControlsComponent,
    ScoreModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SharedModule,
    NgxMaskDirective
  ],
  providers: [ManageGameService, provideNgxMask()]
})
export class GameScreenModule {}
