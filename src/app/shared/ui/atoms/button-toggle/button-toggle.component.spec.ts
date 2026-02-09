import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clickByTestId, getByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'feature-toggle');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render the off label by default', () => {
      // Arrange
      fixture.componentRef.setInput('labelOff', 'Disabled');
      fixture.detectChanges();

      // Act
      const label = textByTestId(fixture, 'feature-toggle');

      // Assert
      expect(label).toContain('Disabled');
    });

    it('should render the on label when checked is true', () => {
      // Arrange
      fixture.componentRef.setInput('labelOn', 'Enabled');
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      // Act
      const label = textByTestId(fixture, 'feature-toggle');

      // Assert
      expect(label).toContain('Enabled');
    });
  });

  describe('#onToggle', () => {
    it('should emit true after clicking when initial state is false', () => {
      // Arrange
      spyOn(component.toggled, 'emit');

      // Act
      clickByTestId(fixture, 'feature-toggle');

      // Assert
      expect(component.toggled.emit).toHaveBeenCalledOnceWith(true);
    });

    it('should emit false after clicking when initial state is true', () => {
      // Arrange
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      spyOn(component.toggled, 'emit');

      // Act
      clickByTestId(fixture, 'feature-toggle');

      // Assert
      expect(component.toggled.emit).toHaveBeenCalledOnceWith(false);
    });

    it('should not emit when the component is disabled', () => {
      // Arrange
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      spyOn(component.toggled, 'emit');

      // Act
      clickByTestId(fixture, 'feature-toggle');

      // Assert
      expect(component.toggled.emit).not.toHaveBeenCalled();
    });
  });

  describe('#dom-testid', () => {
    it('should expose data-testid with the same value as id', () => {
      // Arrange

      // Act
      const element = getByTestId<HTMLElement>(fixture, 'feature-toggle');

      // Assert
      expect(element.getAttribute('data-testid')).toBe('feature-toggle');
    });
  });
});
