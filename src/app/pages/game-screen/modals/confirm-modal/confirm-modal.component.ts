import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent implements OnInit {
  @Output() restartGame = new EventEmitter<boolean>();

  succeedCount: number;
  failedCount: number;

  private isRestart = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.bsModalRef.onHide?.pipe(take(1)).subscribe(() => {
      this.restartGame.emit(this.isRestart);
    });
  }

  hide(): void {
    this.bsModalRef.hide();
  }

  handleRestartGame(): void {
    this.isRestart = true;
    this.hide();
  }
}
