import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clickByTestId, getByTestId, queryByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'summary-card');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render the title when title input has value', () => {
      // Arrange
      fixture.componentRef.setInput('title', 'Player Stats');
      fixture.detectChanges();

      // Act
      const cardText = textByTestId(fixture, 'summary-card');

      // Assert
      expect(cardText).toContain('Player Stats');
    });

    it('should render the subtitle when subtitle input has value', () => {
      // Arrange
      fixture.componentRef.setInput('subtitle', 'Last 7 rounds');
      fixture.detectChanges();

      // Act
      const cardText = textByTestId(fixture, 'summary-card');

      // Assert
      expect(cardText).toContain('Last 7 rounds');
    });
  });

  describe('#onCardClick', () => {
    it('should emit pressed event when clickable is true', () => {
      // Arrange
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      spyOn(component.pressed, 'emit');

      // Act
      clickByTestId(fixture, 'summary-card');

      // Assert
      expect(component.pressed.emit).toHaveBeenCalledTimes(1);
    });

    it('should not emit pressed event when clickable is false', () => {
      // Arrange
      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();
      spyOn(component.pressed, 'emit');

      // Act
      clickByTestId(fixture, 'summary-card');

      // Assert
      expect(component.pressed.emit).not.toHaveBeenCalled();
    });
  });

  describe('#dom-testid', () => {
    it('should expose data-testid attribute using id value', () => {
      // Arrange

      // Act
      const cardElement = getByTestId<HTMLElement>(fixture, 'summary-card');

      // Assert
      expect(cardElement.getAttribute('data-testid')).toBe('summary-card');
    });

    it('should return null for an unknown test id', () => {
      // Arrange

      // Act
      const missingElement = queryByTestId<HTMLElement>(fixture, 'unknown-card');

      // Assert
      expect(missingElement).toBeNull();
    });
  });
});
