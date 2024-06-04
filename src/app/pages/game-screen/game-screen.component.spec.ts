import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';

import { GameScreenComponent } from './game-screen.component';
import { ManageGameService } from './services/manage-game.service';

describe('GameScreenComponent', () => {
  let component: GameScreenComponent;
  let fixture: ComponentFixture<GameScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameScreenComponent],
      providers: [MockProvider(ManageGameService)],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
