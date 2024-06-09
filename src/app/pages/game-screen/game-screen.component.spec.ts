import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { GameScreenComponent } from './game-screen.component';
import { ManageGameService } from './services/manage-game.service';
import { CountdownComponent } from '@shared/components/countdown/countdown.component';

describe('GameScreenComponent', () => {
  let component: GameScreenComponent;
  let fixture: ComponentFixture<GameScreenComponent>;
  let manageGameService: ManageGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameScreenComponent],
      providers: [MockProvider(ManageGameService)],
      schemas: [NO_ERRORS_SCHEMA]
    });
    manageGameService = TestBed.inject(ManageGameService);
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createBoardElements from ManageGameService', () => {
    const spy = spyOn(manageGameService, 'createBoardElements');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should call checkAndResumeGame from ManageGameService', () => {
    const spy = spyOn(manageGameService, 'checkAndResumeGame');

    component.focusWindowHandler();

    expect(spy).toHaveBeenCalled();
  });

  it('should call checkAndPauseGame from ManageGameService', () => {
    const spy = spyOn(manageGameService, 'checkAndPauseGame');

    component.blurWindowHandler();

    expect(spy).toHaveBeenCalled();
  });

  it('should call checkAndPauseGame from ManageGameService', () => {
    const timerLimit = 100;
    component.countdownComponent = { startCountdown: () => {} } as CountdownComponent;
    spyOn(manageGameService, 'setUpGame').and.returnValue(of(true));
    const spy = spyOn(component.countdownComponent, 'startCountdown');

    component.setUpGame(timerLimit);

    expect(spy).toHaveBeenCalled();
  });

  it('should call startGame from ManageGameService', () => {
    const spy = spyOn(manageGameService, 'startGame');

    component.startGame();

    expect(spy).toHaveBeenCalled();
  });

  it('should call clickOnActiveElement from ManageGameService', () => {
    const  elementId = 1;
    const spy = spyOn(manageGameService, 'clickOnActiveElement');

    component.clickOnActive(elementId);

    expect(spy).toHaveBeenCalled();
  });
});
