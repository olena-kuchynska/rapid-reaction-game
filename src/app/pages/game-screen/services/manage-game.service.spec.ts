import { TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ManageGameService } from './manage-game.service';

describe('ManageGameService', () => {
  let service: ManageGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageGameService, BsModalService]
    });
    service = TestBed.inject(ManageGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
