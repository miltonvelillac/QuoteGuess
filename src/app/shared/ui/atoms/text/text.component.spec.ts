import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'helper-text');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render provided text content', () => {
      // Arrange
      fixture.componentRef.setInput('content', 'Select one option to continue');
      fixture.detectChanges();

      // Act
      const content = textByTestId(fixture, 'helper-text');

      // Assert
      expect(content).toContain('Select one option to continue');
    });
  });

  describe('#muted', () => {
    it('should apply muted class when muted is true', () => {
      // Arrange
      fixture.componentRef.setInput('muted', true);
      fixture.detectChanges();

      // Act
      const textElement = getByTestId<HTMLElement>(fixture, 'helper-text');

      // Assert
      expect(textElement.classList.contains('app-text--muted')).toBeTrue();
    });
  });
});
