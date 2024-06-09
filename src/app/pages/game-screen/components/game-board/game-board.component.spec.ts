import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameElement } from '@core/interfaces/basic-elements';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent]
    });
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickOnActive if it is active element', () => {
    const element = { isActive: true, id: 1 } as GameElement;
    const spy = spyOn(component.clickOnActive, 'emit');

    component.clickElement(element);

    expect(spy).toHaveBeenCalledWith(element.id);
  });

  it('should not emit clickOnActive if it is not active element', () => {
    const element = { isActive: false, id: 2 } as GameElement;
    const spy = spyOn(component.clickOnActive, 'emit');

    component.clickElement(element);

    expect(spy).not.toHaveBeenCalledWith(element.id);
  });

  it('should return id of element', () => {
    const element = { isActive: false, id: 2 } as GameElement;

    const result = component.trackByFn(0, element);

    expect(result).toBe(element.id);
  });
});
