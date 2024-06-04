import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreModalComponent implements OnInit {
  succeedCount: number;
  failedCount: number;

  isUserSucceed = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.isUserSucceed = this.succeedCount > this.failedCount;
  }

  hide(): void {
    this.bsModalRef.hide();
  }
}
